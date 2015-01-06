var React = require('react'),
    Grid = require('react-bootstrap/Grid'),
    Row = require('react-bootstrap/Row'),
    Col = require('react-bootstrap/Col'),
    Input = require('react-bootstrap/Input'),
    Button = require('react-bootstrap/Button');

var FriendInviter = React.createClass({


    handleChange: function(id) {
        var state = this.state.facebookInviteFriends.map(function(friend) {
            return {
                id: friend.id,
                selected: (friend.id === id ? !friend.selected : friend.selected),
                picture: friend.picture,
                name: friend.name
            };
        });

        this.setState({ facebookInviteFriends: state });

    },
    getInitialState: function () {


        var friends = this.props.friends.map(function(friend) {
            return {
                id: friend.id,
                friend: false,
                picture: friend.picture.data.url,
                name: friend.name
            };
        });

        return {
            facebookLogin: false,
            facebookInviteFriends: friends
        }
    },
    render: function () {

        var self = this;

        var friends = this.state.facebookInviteFriends.map(function (friend) {
            return (

                <Col xs={3} className="invite-friend" key={friend.id}>
                    <div className="inner">
                        <div className="image-mask">
                            <img src={friend.picture}  alt={friend.name} />
                        </div>
                        <Input
                        type="checkbox"
                        value={friend.id}
                        checked={friend.selected}
                        label={friend.name}
                        ref="input"
                        onChange={self.handleChange.bind(self, friend.id)} />
                    </div>
                </Col>
            );
        });

        return (
                <Col xs={8} xsPush={2}>
                    {friends}
                </Col>
        );
    }


});

module.exports = FriendInviter;
