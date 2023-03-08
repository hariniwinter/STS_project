import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            customerid: '',
            flavor: '',
            price: '',
            img:''
        }
        this.changeCustomerIdHandler = this.changeCustomerIdHandler.bind(this);
        this.changeFlavorHandler = this.changeFlavorHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({
                customerid: employee.customerid,
                flavor: employee.flavor,
                price : employee.price,
                img : employee.img
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {customerid: this.state.customerid, flavor: this.state.flavor, price: this.state.price, img: this.state.img};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
    }
    
    changeCustomerIdHandler= (event) => {
        this.setState({customerid: event.target.value});
    }

    changeFlavorHandler= (event) => {
        this.setState({ flavor: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }
    changeImgHandler= (event) => {
        this.setState({img: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Customerid: </label>
                                            <input placeholder="customerid" name="customerid" className="form-control" 
                                                value={this.state.customerid} onChange={this.changeCustomerIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Flavor: </label>
                                            <input placeholder="flavor" name="flavor" className="form-control" 
                                                value={this.state.flavor} onChange={this.changeFlavorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Img Url: </label>
                                            <input placeholder="Img Url" name="Img" className="form-control" 
                                                value={this.state.img} onChange={this.changeImgHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
