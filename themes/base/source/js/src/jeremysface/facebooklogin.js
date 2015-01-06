var React           = require('react'),
    Grid            = require('react-bootstrap/Grid'),
    Row             = require('react-bootstrap/Row'),
    Col             = require('react-bootstrap/Col'),
    Button          = require('react-bootstrap/Button');

var FacebookLogin = React.createClass({

    login: function() {
        window.parent.location.href = "https://www.facebook.com/dialog/oauth?client_id=" + 1391621381131922 + "&redirect_uri=https://apps.facebook.com/jeremyeatsfriends/&scope=user_friends,manage_friendlists";
    },

    render: function() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                    <h2>Please login with Facebook to continue</h2>
                        <a href="#" onClick={this.login}><img src="themes/base/production/images/fb-login.png" alt="Login With Facebook" /></a>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = FacebookLogin;
