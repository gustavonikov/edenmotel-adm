import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Products from './pages/Products';
import Registers from './pages/Registers';
import AddApartment from './pages/Registers/Add/Apartment';
import AddUser from './pages/Registers/Add/User';
import AddAdmin from './pages/Registers/Add/Admin';
import ModifyApartments from './pages/Registers/Modify/Apartments';
import ModifyUsers from './pages/Registers/Modify/User';
import ModifyAdmins from './pages/Registers/Modify/Admin';
import Report from './pages/Report';
import History from './pages/History';
import ApartmentsHistory from './pages/History/Features/Apartments';
import ClosureReportsHistory from './pages/History/Features/ClosureReports';
import Dashboard from './pages/Dashboard';
/* import ConsumptionTable from './pages/Dashboard/ConsumptionTable'; */
import Tolerance from './pages/Tolerance';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/dashboard" component={Dashboard} exact />
                {/* <Route path="/dashboard/consumption-table" component={ConsumptionTable} /> */}
                <Route path="/products" component={Products} />
                <Route path="/registers" component={Registers} exact />
                <Route path="/registers/add-apartment" component={AddApartment}/>
                <Route path="/registers/modify-apartments" component={ModifyApartments}/>
                <Route path="/registers/add-user" component={AddUser}/>
                <Route path="/registers/modify-users" component={ModifyUsers}/>
                <Route path="/registers/add-admin" component={AddAdmin}/>
                <Route path="/registers/modify-admins" component={ModifyAdmins}/>
                <Route path="/report" component={Report} />
                <Route path="/history" component={History} exact />
                <Route path="/history/apartments" component={ApartmentsHistory} />
                <Route path="/history/closure-reports" component={ClosureReportsHistory} />
                <Route path="/tolerance" component={Tolerance} />
            </Switch>
        </Router>
    );
}
