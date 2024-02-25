// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;



error UserNotExist();
error UserAlreadyExist();
error UnauthorizedAccess();
contract Profiler{

    mapping(string=>User) private userMapping;
    struct User{
       string userName;
       string name;
       string password;
       string bio;
       uint256 age; 
    } 
     
    modifier onlyExistingUser(string memory userName) {
        if (bytes(userMapping[userName].userName).length == 0) revert UserNotExist();
        _;
    }
    modifier onlyAuthorizedUser(string memory userName, string memory password) {
        if (keccak256(bytes(userMapping[userName].password)) != keccak256(bytes(password))) revert UnauthorizedAccess();
        _;
    }
    function login(string memory userName,string memory password)public view onlyExistingUser(userName) onlyAuthorizedUser(userName,password) returns(User memory){
       return userMapping[userName];

    }
    function signUp(string memory userName,string memory name,string memory password,string memory bio,uint256 age)public returns(bool){
        require(bytes(userName).length>0,"userName must be given");
        require(bytes(name).length>0,"userName must be given");
        require(bytes(password).length>0,"userName must be given");
        require(bytes(bio).length>0,"userName must be given");
        require(age>0,"age is not 0");

        if(bytes(userMapping[userName].userName).length!=0)revert UserAlreadyExist(); 

        User memory user;
        user.userName=userName;
        user.name=name;
        user.password=password;
        user.bio=bio;
        user.age=age;


        userMapping[userName]=user;

        return true;
    }   
    function updateUser(string memory userName, string memory newName, string memory newPassword, string memory newBio, uint256 newAge) public onlyExistingUser(userName) onlyAuthorizedUser(userName, userMapping[userName].password) returns(User memory) {
        User storage user = userMapping[userName];
        user.name = newName;
        user.password = newPassword;
        user.bio = newBio;
        user.age = newAge;
        return userMapping[userName];
    }

    function deleteUser(string memory userName) public onlyExistingUser(userName) onlyAuthorizedUser(userName, userMapping[userName].password) {
        delete userMapping[userName];
    }
    function getUser(string memory userName)public view returns(User memory){
        return userMapping[userName];
    } 
}