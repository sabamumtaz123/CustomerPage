/**
 *
 * CustomerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModalPopUp from 'components/ModalPopUp';
import SuccErrModal from 'components/SuccErrModal';
import { actGetCustomerList } from './actions';
import { lightMuiTheme } from 'utils/helper/theme';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCustomerPage from './selectors';
import { constants } from 'utils/helper/constants';
import { dashParser } from 'utils/helper/parser';

import reducer from './reducer';
import saga from './saga';


import SearchField from 'components/SearchField';
import normalizePhone from 'utils/normalize/normalizePhone';
import normalizeCode from 'utils/normalize/normalizeCode';
import normalizeName from 'utils/normalize/normalizeName';
import {
  codeLen,
  titleLen,
  descLen,
  phoneLen,
  faxLen,
  addLen,
  required,
} from 'utils/helper/validation';



export class CustomerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.createCustomInsertButton = this.createCustomInsertButton.bind(this);
    this.addToggle = this.addToggle.bind(this);
    this.addClick = this.addClick.bind(this);
    this.state = {
      addModal: false,
      customerData: [{
        name: "customer1",
        description: 55,
        status: 'Y'
      }, {
        name: ".customer2",
        description: 67,
        status: 'Y'
      },
      {
        name: ".customer3",
        description: 89,
        status: 'N'
      },
      {
        name: ".customer4",
        description: 34,
        status: 'N'
      }, {
        name: "customer5",
        description: 93,
        status: 'Y'
      }
      ],

      // updateModal: false,
      // succModal: false,
      // errModal: false,
      // actionType: constants.ACTION_TYPE.UPDATE,
    };

  }
  componentDidMount() {
    this.props.dispatch(actGetCustomerList());
  }

  addToggle() {
    this.setState({
      addModal: !this.state.addModal,
      actionType: constants.ACTION_TYPE.ADD,
    });
  }
  createCustomInsertButton() {
    return (
      <Button className="btn btn-info col-sm-2" onClick={this.addToggle} >
        <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add
        </Button>
    );
  }
  addClick(values) {
    console.log('values', values.toJS());
    const custInfo = {
      name: values.toJS().name,
      description: values.toJS().description,
      status: values.toJS().status
    };
    const data = this.state.customerData;
    data.push(custInfo);
    
    this.setState({
      customerData: data,
      addModal: false,
    });
  }
  render() {
    const formFields = [
      {
        label: 'Customer Name',
        name: 'name',
        type: 'text',
        placeHolder: 'Name',
        mandatory: 'true',
        normalize: normalizeName,
        validation: [required],
      },
      {
        label: 'Customer Description',
        name: 'description',
        type: 'text',
        placeHolder: 'Description',
        mandatory: 'true',
        normalize: normalizeName,
        validation: [required],
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        mandatory: 'true',
        options:
        {
          Y: 'Active',
          N: 'In Active',
        },
      },
    ];
    const bsTableOptions = {
      noDataText: 'No Zones Found',
      page: 1,  // which page you want to show as default
      hideSizePerPage: true,
      sizePerPage: constants.ROWS_PER_PAGE,
      insertBtn: this.createCustomInsertButton,
      onRowDoubleClick: this.updateToggle,
      exportCSVBtn: this.createCustomExportCSVButton,
      searchPanel: (props) => (<SearchField {...props} />),
    };

    return (
      <div>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div id="page-wrapper">
            <div className="row">
              <div className="col-md-12">
                <h2 className="page-header text-center">Customer</h2>
              </div>
            </div>
            <div className="container">
              <BootstrapTable
                data={this.state.customerData}
                keyField="code"
                options={bsTableOptions}
                paginationa
                search
                striped
                insertRow
              >
                <TableHeaderColumn dataField="name" width="20%">Name</TableHeaderColumn>
                <TableHeaderColumn dataField="description" width="20%">Description</TableHeaderColumn>
                <TableHeaderColumn dataField="status" width="20%">Status</TableHeaderColumn>
              </BootstrapTable>

              <ModalPopUp
                formId="CustomerFormAdd"
                fields={formFields}
                isOpen={this.state.addModal}
                toggle={this.addToggle}
                hideUpdateBtn
                errToggle={this.errToggle}
                errIsOpen={this.state.errModal}
                formClass="form-inline"
                title="Add Customer"
                onSubmit={this.addClick}
              />
              <SuccErrModal
                isOpen={this.state.succModal}
                isSuccess
                toggle={() => {
                  this.setState({ succModal: !this.state.succModal, updateModal: false, addModal: false });
                  this.props.GetZoneList();
                }}
                title="Success"
                bodyText="Success"
              />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
CustomerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  SelectCustomerPage: PropTypes.func,

};

const mapStateToProps = createStructuredSelector({
  customerpage: makeSelectCustomerPage(),
  // data: actGetCustomerList(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customerPage', reducer });
const withSaga = injectSaga({ key: 'customerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CustomerPage);
