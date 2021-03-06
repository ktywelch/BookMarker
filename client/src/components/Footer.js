import BottomNavigation from '@material-ui/core/BottomNavigation';

const Footer = (props) => {
    return (
        < BottomNavigation >
         <button type="button"  style={{ height: 26, backgroundColor: 'teal', color: 'white'}} 
             onClick={() => window.open('https://www.linkedin.com/in/kathleen-welch-9701261/')} >LinkedIn Profile </button>
         <button type="button"  style={{ height: 26, backgroundColor: 'teal', color: 'white'}} 
             onClick={() => window.open('https://github.com/ktywelch/')} >Git Profile </button>    
        </ BottomNavigation>
      );
}
 
export default Footer;

