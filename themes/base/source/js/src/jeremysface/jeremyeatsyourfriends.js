var React = require('react'),
    Grid = require('react-bootstrap/Grid'),
    Row = require('react-bootstrap/Row'),
    Col = require('react-bootstrap/Col'),
    Button = require('react-bootstrap/Button'),
    FacebookLogin = require('./facebooklogin.js'),
    FriendInviter = require('./friendinviter.js'),
    Game = require('./game.js');

var JeremyEatsYourFriends = React.createClass({

    handleFacebookLogin: function () {
        var self = this;

        FB.init({
            appId: '1391621381131922',
            status: true,
            xfbml: true,
            version: 'v2.2',
            cookie: true
        });

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                FB.api('/me/friends', function (response) {
                    self.setState({
                        facebookLogin: true,
                        facebookFriends: response.data
                    });
                });

                FB.api('/me/invitable_friends', function (response) {
                    self.setState({
                        facebookLogin: true,
                        facebookInvitableFriends: response.data,
                        facebookFriends: response.data
                    });
                });


            } else {
                this.setState({
                    facebookLogin: false
                });
            }
        });
    },

    handlePlayNow: function() {
        this.setState({
            playing: true
        });
    },

    getInitialState: function () {
        return {
            facebookLogin: false,
            facebookFriends: [],
            facebookInvitableFriends: [],
            playing: false
        }
    },
    componentWillMount: function() {
        if (window.FB) {
            this.handleFacebookLogin();
        } else if (this.props.facebookIsUnavailable) {

            var friends = [
                {
                    name: 'Stevie',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f1.jpg'
                        }
                    }
                },
                {
                    name: 'Kim',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f2.jpg'
                        }
                    }
                },
                {
                    name: 'Jeremy',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f3.jpg'
                        }
                    }
                },
                {
                    name: 'Dave',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f4.jpg'
                        }
                    }
                },
                {
                    name: 'Jake',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f5.jpg'
                        }
                    }
                },
                {
                    name: 'James',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f6.jpg'
                        }
                    }
                },
                {
                    name: 'James',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f7.jpg'
                        }
                    }
                },
                {
                    name: 'James',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f8.jpg'
                        }
                    }
                },
                {
                    name: 'James',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f9.jpg'
                        }
                    }
                },
                {
                    name: 'James',
                    picture: {
                        data: {
                            url: 'themes/base/production/images/f10.jpg'
                        }
                    }
                }
            ];

            this.setState({
                facebookLogin: false,
                facebookFriends: friends,
                playing: true
            })
        } else {

            var self = this;

            setTimeout(function() {
                self.setState({
                    facebookLogin: false
                });
            }, 500);
        }
    },

    render: function () {

        var board = (<FacebookLogin/>);

        if (this.state.facebookLogin) {
            if (this.state.facebookInvitableFriends.length !== 0) {

                board = (
                    <Row>
                        <Col xs={12}>
                            <Button onClick={this.handlePlayNow} bsStyle="primary">Play now</Button>
                        </Col>
                        <FriendInviter friends={this.state.facebookInvitableFriends} />
                    </Row>
                )
            }
        }

        if (this.state.playing) {
            var friends = this.state.facebookFriends.map(function(friend,pos) {
                return {
                    key: pos,
                    name: friend.name,
                    picture: friend.picture,
                    identifier: "ball-" + pos,
                    value: Math.random() * 1000
                }
            });

            board = <Game friends={friends}/>
        }

        return (
            <div>
                <div id="fb-root"></div>
                <header>
                <Grid>
                <Row className="header">
                    <Col xs={12}>
                        <h1>Continuous banner goes here</h1>
                    </Col>

                </Row>
                </Grid>
                </header>

                <Grid className="main">
                <Row>
                    {board}
                </Row>
                </Grid>

                <footer>
                <Grid>
                    <Row>
                        <p>Some information and a copyright &copy; notice. A link to github.</p>
                    </Row>
                </Grid>
                </footer>

            </div>
        )
    }


});



module.exports = JeremyEatsYourFriends;
