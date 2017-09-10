import { reduxForm } from 'redux-form';
import Searchbar from '../Searchbar';

export default reduxForm({
  form: 'search',
})(Searchbar);