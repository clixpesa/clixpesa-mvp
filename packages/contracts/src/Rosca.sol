// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./utils.sol";
import "hardhat/console.sol";

/**
@title Clixpesa Rosca Space Contract
@author Dekan Kachi - @kachdekan
@notice Allow users to from a RoSCA savings groups, 
creact savings pockets, and lend to each other within the group.
*/

struct RoscaInputDetails {
    IERC20 token;
    string roscaName;
    string imgLink;
    string authCode;
    uint256 goalAmount;
    uint256 ctbAmount;
    string ctbDay;
    string ctbOccur;
    string disbDay;
    string disbOccur;
}

contract Rosca {
    using SafeMath for uint256;

    enum PotRoundState {
        isOpen,
        isClosed,
        isPaidOut,
        isDelayed
    }
    enum RoscaState {
        isActive,
        isInActive
    }

    /// @dev Round details
    struct PotRoundDetails {
        uint256 roundId;
        address payable roundOwner;
        uint256 roundAmount;
        uint256 roundBalance;
        uint256 roundDeadline;
        mapping(address => uint256) contributions;
        PotRoundState roundState;
    }

    mapping(address => bool) isMember;
    mapping(address => bool) isPotted;

    /// @dev Rosca details
    struct RoscaDetails {
        RoscaInputDetails RID;
        RoscaState roscaState;
        PotRoundDetails PD;
        address[] members;
        address[] admins;
        string[] activeLoanIds;
        string[] loanRequestIds;
        string[] loanOfferIds;
        uint256 currentBalance;
    }

    /// @dev Rosca events
    event CreatedNewRound(
        uint256 roundId,
        address payable roundOwner,
        uint256 roundDeadline
    );
    event FundedRound(
        uint256 roundId,
        address payable roundContributor,
        uint256 amount
    );
    event PaidOutRound(
        uint256 roundId,
        address payable roundOwner,
        uint256 amount
    );
    event LoanRequestCreated(
        string loanRequestId,
        address payable loanRequester,
        uint256 amount
    );
    event LoanOfferCreated(
        string loanOfferId,
        address payable loanOfferer,
        uint256 poolsize
    );
    event LoanInitiated(
        string loanId,
        address payable loanInitiator,
        address payable loanRecipient,
        uint256 amount
    );

    /// @dev Initialize Rosca contract
    RoscaDetails RD;

    constructor(RoscaInputDetails memory _RID) {
        RD.RID = _RID;
        RD.roscaState = RoscaState.isActive;
        RD.currentBalance = RD.RID.token.balanceOf(address(this));
        RD.members.push(msg.sender);
        RD.admins.push(msg.sender);
        isMember[msg.sender] = true;

        /// @dev Initialize first round
        _createNewRound();
    }

    /// @dev Members can join the Rosca with an authCode
    function joinRosca(string memory _authCode) public {
        require(
            keccak256(abi.encode(_authCode)) ==
                keccak256(abi.encode(RD.RID.authCode)),
            "!authCode"
        );
        require(isMember[msg.sender] == false, "Already a member");
        RD.members.push(msg.sender);
        isMember[msg.sender] = true;
    }

    /// @dev Create new round
    function _createNewRound() internal {
        uint256 _ctbDay = _getDayNo(RD.RID.ctbDay);
        uint256 _ctbDeadline = _nextDayAndTime(_ctbDay);
        RD.PD.roundId = RD.PD.roundId.add(1);
        RD.PD.roundOwner = payable(RD.members[RD.PD.roundId.sub(1)]); //check this!!
        RD.PD.roundAmount = RD.RID.ctbAmount;
        RD.PD.roundBalance = 0;
        RD.PD.roundDeadline = _ctbDeadline;
        RD.PD.roundState = PotRoundState.isOpen;

        emit CreatedNewRound(
            RD.PD.roundId,
            payable(RD.members[0]),
            RD.PD.roundDeadline
        );
    }

    /// @dev Fund round
    function fundRound(uint256 _amount) external {
        require(isMember[msg.sender] == true, "!Member");
        require(
            RD.PD.contributions[msg.sender] < RD.RID.ctbAmount,
            "Fully contributed"
        );
        require(
            RD.PD.roundState == PotRoundState.isOpen ||
                RD.PD.roundState == PotRoundState.isDelayed,
            "Round not open for funding"
        );
        require(RD.PD.roundDeadline > block.timestamp, "Round deadline passed");
        require(
            RD.RID.token.balanceOf(msg.sender) >= RD.RID.ctbAmount,
            "Insufficient balance"
        );
        require(
            RD.RID.token.transferFrom(
                msg.sender,
                payable(address(this)),
                _amount
            ),
            "Transfer failed"
        );

        RD.PD.contributions[msg.sender] = RD.PD.contributions[msg.sender].add(
            _amount
        );
        RD.PD.roundBalance = RD.PD.roundBalance.add(_amount);
        RD.currentBalance = RD.RID.token.balanceOf(address(this));

        if (RD.PD.roundBalance == RD.PD.roundAmount) {
            RD.PD.roundState = PotRoundState.isClosed;
        }

        emit FundedRound(RD.PD.roundId, payable(msg.sender), _amount);
    }

    /// @dev Interna utility fyunction to get day number
    /// @dev schDay: 1. Monday 7. Sunday
    /// @dev schOcurr: 1-daily, 7-weekly, 28-monthly
    /// @dev Handled weekly for now.
    /// @dev !TODO: handle daily and monthly

    function _nextDayAndTime(
        uint256 schDay
    ) internal view returns (uint256 nextTimeStamp) {
        uint256 day;
        uint256 month;
        uint256 year;
        uint256 _days = block.timestamp / (24 * 60 * 60);
        uint256 dayOfWeek = ((_days + 3) % 7) + 1;
        (year, month, day) = utils._daysToDate(_days);
        uint256 nextDay = day + ((7 + schDay - dayOfWeek) % 7);

        nextTimeStamp =
            utils._daysFromDate(year, month, nextDay) *
            (24 * 60 * 60);

        if (nextTimeStamp <= block.timestamp) {
            nextDay = nextDay + 7;
            nextTimeStamp = nextTimeStamp + 7 days;
        }

        return (nextTimeStamp);
    }

    function _getDayNo(
        string memory day
    ) internal pure returns (uint256 dayNo) {
        string[7] memory weekList = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ];
        bytes32 encodedElement = keccak256(abi.encode(day));
        for (uint256 i = 0; i < weekList.length; i++) {
            if (encodedElement == keccak256(abi.encode(weekList[i]))) {
                return i + 1;
            }
        }
    }
}
