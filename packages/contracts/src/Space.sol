// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./utils.sol";
import "./Rosca.sol";
import "hardhat/console.sol";

/** 
@title Clixpesa Rosca Space Contract
@author Dekan Kachi - @kachdekan
@notice Store and savings pockets, and lend to each other within the group.
 */

contract Space {
    using SafeMath for uint256;

    struct ActiveSpace {
        string spaceId; //will be an address for rosca spaces
        string spaceType; // rosca, personal, regular, mchango,
    }

    //List of all spaces
    Rosca[] public roscas;
    mapping(address => ActiveSpace[]) mySpaces;
    mapping(address => mapping(address => uint256)) mySpaceIdx; //starts from 1, 0 means was removed
}
