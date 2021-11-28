// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract GiftVoucher is  ERC721URIStorage,  Ownable {
    //assumption , gift voucher can only use full amount. cannot use partial amount
    //assumption , 1 eth voucher
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;
    address public LinkToken;
     struct Voucher {
        uint256 deadline;
        //string[] allowableURL; todo: future enhancement 
        string amount;
        string voucherName;
        bool isAvailable;
        address usedBy;
        uint256 usedOn;
        address boughtBy;
        address ownBy;
        bool exists;
    }

    Voucher[] public vouchers;
    // assumption hard code amount and vouchername
    // todo: make it variable to 0.1, 0.2, 0.3 and can be determine when purchase the voucher
    string voucherAmount = "0.1 eth";
    string voucherName = "Gift Voucher 0.1 eth";

    mapping(uint256 => address) tokenIDToBuyer;
    mapping(uint256 => address) voucherHolder;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event requestedVoucher(uint256 tokenId);
    event redeemedVoucher(uint256 tokenId);
    event transferedVoucher(uint256 tokenId, address holder);



    constructor () public 
            ERC721("GiftVoucherHackathorn","gVoucherHkt")
    {

    }

    
    // buy the voucher with the value of 0.1 eth to give a friend.
    function buyVoucher() payable public returns(uint256)
    {
        require(msg.value == ((1 * 10 **18)/ 10), "Required 0.1 Eth to purchase the voucher.");
        uint256 tokenId = _tokenIds.current();  
        _tokenIds.increment();

        //ToCharacterName[tokenId] = name;
        tokenIDToBuyer[tokenId] = msg.sender;
        voucherHolder[tokenId] = msg.sender;

        uint256 deadline = block.timestamp + 30 days;
       
        bool isAvailable = true;
        address usedBy = address(0);
        uint256 usedOn = 0;
        address boughtBy = msg.sender;
        bool exists = true;
        address ownBy = msg.sender;
        //token;

        Voucher memory voucher = Voucher(
                deadline,
                voucherAmount,
                voucherName,
                isAvailable,
                usedBy,
                usedOn,
                boughtBy,
                ownBy,
                exists);
        vouchers.push(voucher);
        _safeMint(voucherHolder[tokenId], tokenId);
        console.log("tokenID");
        console.log(tokenId);
        emit requestedVoucher(tokenId);
        return tokenId;

    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    // This is used to transfer the voucher to a friend for their birthday or wedding
    function giveVoucher(uint256 tokenID, address transferTo) public
    {
        require(vouchers[tokenID].isAvailable, "Voucher already been used");
        require(voucherHolder[tokenID] == msg.sender, "Voucher does not belong to you");
        address owner = voucherHolder[tokenID];
        voucherHolder[tokenID] = transferTo;
        vouchers[tokenID].ownBy = transferTo;
        //ERC721(this).safeTransferFrom(owner,voucherHolder,tokenID);
        emit transferedVoucher(tokenID, transferTo);
    }

    function getVoucherDetails(uint256 tokenID) view public returns(
        uint256 ,
        string memory,
        string memory,
        bool ,
        address ,
        address ,
        address 
    )
    {
        require(vouchers[tokenID].exists  , "Token Id does not exist");
        return (
            vouchers[tokenID].deadline,
            vouchers[tokenID].amount,
            vouchers[tokenID].voucherName,
            vouchers[tokenID].isAvailable,
            vouchers[tokenID].usedBy,
            vouchers[tokenID].boughtBy,
            vouchers[tokenID].ownBy
        );
        
    }

    function getOwnedVoucherCount(address owner, bool checkIsAvailable) view public returns(uint)
    {
        uint count = 0;
        for(uint256 tokenID = 0; tokenID< vouchers.length; tokenID ++)
        {
            if(vouchers[tokenID].ownBy == owner)
            {
                if(checkIsAvailable)
                {
                    if(vouchers[tokenID].isAvailable)
                    {
                       count++;
                    }
                }
                else
                {
                    count++;
                }
            }
        }
        return count;
    }

    function getOwnedVoucher(address owner, bool checkIsAvailable) view public returns(uint256[] memory )
    {
        uint count = 0;
        uint ownCount = getOwnedVoucherCount(owner,checkIsAvailable);
        uint256[] memory ownVouchers = new uint256[](ownCount);
        for(uint256 tokenID = 0; tokenID< vouchers.length; tokenID ++)
        {
            if(vouchers[tokenID].ownBy == owner)
            {
                if(checkIsAvailable)
                {
                    if(vouchers[tokenID].isAvailable)
                    {
                       ownVouchers[count] = tokenID;
                       count++;
                    }
                }
                else
                {
                    ownVouchers[count] = tokenID;
                    count++;
                }
                
            }
        }
        return ownVouchers;
    }

    // this function is used when the item seller receive this voucher and decide to redeem the voucher
    function redeemVoucher(uint256 tokenID) public
    {
       
        require(vouchers[tokenID].isAvailable, "Voucher already been used");
        require(voucherHolder[tokenID] == msg.sender, "Voucher does not belong to you");
        vouchers[tokenID].isAvailable = false;
        vouchers[tokenID].usedBy = msg.sender;
        vouchers[tokenID].usedOn = block.timestamp;
        _burn(tokenID);
        payable(msg.sender).transfer((1 * 10 **18)/ 10);
        emit redeemedVoucher(tokenID);
        //transfer amount to seller.
        // 
    }
}

