// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/utils/math/Math.sol";

contract ETContract {
    using Math for uint256;

    struct Order {
        address seller;
        uint unit_amount;        // In kW/h
        uint price_per_unit;
        bool active;
    }

    struct Prosumer {
        bool is_registered;
        uint energy_balance;     // Available energy units
    }

    mapping (uint => Order) public place_order;
    mapping (address => Prosumer) private prosumers;

    // Events
    event ProsumerRegistered(address prod);
    event EnergyDeposited(address prod, uint units);
    event sellOnList(address prod, uint orderId, uint units, uint price_per_unit);
    event ExecutedTrade(address buyer, address seller, uint units, uint price);
    event Withdrawal(address seller, uint amount);

    // Modifier Ensuring whether Prosumer is Registered or not
    modifier ensureRegistration() {
        require(prosumers[msg.sender].is_registered, "Trader not Registered");
        _;
    }

    // Registering a new Prosumer
    function registerProsumer() public {
        require(!prosumers[msg.sender].is_registered, "Trader is Registered");
        prosumers[msg.sender].is_registered = true;

        emit ProsumerRegistered(msg.sender);
    }

    // Depositing Energy
    function depositEnergy(uint _units) public ensureRegistration{
        require(_units > 0, "Invalid amount");
        prosumers[msg.sender].energy_balance += _units;
        
        emit EnergyDeposited( msg.sender, _units);

    }

    function sellEnergy(uint _order_id, uint _units, uint _price_per_unit) public ensureRegistration {
        require(_units > 0 && _price_per_unit > 0, "Invalid order parameters");

        Order memory new_order = Order({
            seller: msg.sender,
            unit_amount: _units,
            price_per_unit: _price_per_unit,
            active: true
        });

        place_order[_order_id] = new_order;

        emit sellOnList(msg.sender, _order_id, _units, _price_per_unit);
    }

    function buyEnergy(uint _order_id) public payable {
        Order storage buy_order = place_order[_order_id];

        uint total_price = buy_order.unit_amount * buy_order.price_per_unit;
        require(buy_order.active,"Order Expired");
        require(total_price <= msg.value, "Insufficient funds");

        // Transfer ethers to seller
        payable(buy_order.seller).transfer(total_price);

        // Update energy balance
        prosumers[msg.sender].energy_balance += buy_order.unit_amount;
        prosumers[buy_order.seller].energy_balance -= buy_order.unit_amount;
        
        // Mark order as executed
        buy_order.active = false;
        
        emit ExecutedTrade(msg.sender, buy_order.seller, buy_order.unit_amount, buy_order.price_per_unit);

    }

    // Withdraw ethers from contract
    function withdraw(uint _amount) public ensureRegistration {
        require(_amount > 0, "Invalid amount");
        require(address(this).balance >= _amount, "Insufficient contract balance");

        payable(msg.sender).transfer(_amount);

        emit Withdrawal(msg.sender, _amount);
    }

    // Get contract balance
    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getEnergyBalance() public view returns (uint) {
        return prosumers[msg.sender].energy_balance;
    }

    function getEtherBalance() public view returns (uint) {
    return msg.sender.balance;
    }


}
