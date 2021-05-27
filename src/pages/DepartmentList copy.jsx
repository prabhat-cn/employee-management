import React, { Component } from 'react'  
import BootstrapTable from 'react-bootstrap-table-next';  
import axios from 'axios';  
import paginationFactory from 'react-bootstrap-table2-paginator';
export class DepartmentList extends Component {  
        state = {  

            department: [],
            columns: [{  
            dataField: 'Id',
            text: 'Id'
            },  

            {
            dataField: 'Name',
            text: 'Name',
            }, {  

            dataField: 'Age',  

            text: 'Age',  

            sort: true  

            },  

            {  

            dataField: 'Address',  

            text: 'Address',  

            sort: true  

            },  

            {  

            dataField: 'City',  

            text: 'City',  

            sort: true  

            },  

            {  

            dataField: 'ContactNum',  

            text: 'ContactNum',  

            sort: true  

            },  

            {  

            dataField: 'Salary',  

            text: 'Salary',  

            sort: true  

            },  

            {  

            dataField: 'Department',  

            text: 'Department',  

            sort: true  

            }]  

        }  

              componentDidMount() {    

                axios.get(`${process.env.REACT_APP_API}/api/department`).then(response => { 
                    console.log('API-RESP->', response.data);   

                  this.setState({    

                    department: response.data    

                  });    

                });    

              }   

        render() {  

                const options = {  

                        page: 2,   

                        sizePerPageList: [ {  

                          text: '5', value: 5
                        }, {
                          text: '10', value: 10
                        }, {
                          text: 'All', value: this.state.department.length
                        } ],
                        sizePerPage: 5,
                        pageStartIndex: 0,
                        paginationSize: 3,
                        prePage: 'Prev',   
                        nextPage: 'Next',
                        firstPage: 'First',
                        lastPage: 'Last',
                      };
                return (
                        <div className="container">  
                        <div class="row" className="hdr">    
                        <div class="col-sm-12 btn btn-info">    
                        React Bootstrap Table with Searching and Custom Pagination
                         </div>
                         </div> 
                        <div  style={{ marginTop: 20 }}> 
                        <BootstrapTable
                        striped
                        hover
                        keyField='id'   
                        data={ this.state.department }   
                        columns={ this.state.columns }  
                        pagination={ paginationFactory(options) } />  
                      </div>  
                      </div>  
                )  
        }  

}  
export default DepartmentList 