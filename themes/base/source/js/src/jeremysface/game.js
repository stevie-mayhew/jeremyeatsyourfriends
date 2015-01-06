var React = require('react'),
    Grid = require('react-bootstrap/Grid'),
    Row = require('react-bootstrap/Row'),
    Col = require('react-bootstrap/Col'),
    Button = require('react-bootstrap/Button'),
    keymaster = require('keymaster'),
    TweenLite       = require('../../../../node_modules/gsap/src/uncompressed/TweenLite.js'),
    Physics2DPlugin      = require('../../../../node_modules/gsap/src/uncompressed/plugins/Physics2DPlugin.js'),
    CSSPlugins      = require('../../../../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js'),
    BezierPlugin      = require('../../../../node_modules/gsap/src/uncompressed/plugins/BezierPlugin.js');



require('gsap-react-plugin');
var collisionTimer;

var Game = React.createClass({
    getInitialState: function() {
        return {
            spaceKey: false,
            shotVelocity: 0.0,
            score: 0,
            friend: 0,
            shotFriends: [],
            friends: this.props.friends
        };

    },
    collision: function() {

        var self = this;

        if (this.state.shotFriends.length) {

            var selectors = this.state.shotFriends.map(function(friend) {
                return '#' + friend.identifier;
            });

            var elements = document.querySelectorAll(selectors.join());
            var jeremy = document.getElementById('jeremy');
            Array.prototype.forEach.call(elements, function(ball, i){

                var rect1 = {x: jeremy.offsetLeft, y: jeremy.offsetTop, width: jeremy.offsetWidth, height: jeremy.offsetHeight};
                var rect2 = {x: ball.offsetLeft, y: ball.offsetTop, width: ball.offsetWidth, height: ball.offsetHeight};

                if (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.height + rect1.y > rect2.y) {

                    self.setState({
                        score: self.state.score + 100, //  ball.dataset.value, // todo score
                        shotFriends: self.state.shotFriends.slice(1,self.state.shotFriends.length) // todo index of actual ball
                    });

                }

                // out of bounds
                rect1 = {x: 0, y: 0, width: 760, height: 600};

                if (rect1.x > rect2.x + rect2.width ||
                    rect1.x + rect1.width < rect2.x ||
                    rect1.y > rect2.y + rect2.height ||
                    rect1.height + rect1.y < rect2.y) {

                    self.setState({
                        shotFriends: self.state.shotFriends.slice(1,self.state.shotFriends.length - 1) // todo index
                    });

                }


            });

        }
    },
    onSpaceKey: function() {
        // TODO shoot at correct speed
        // this should be handled by starting a timer or a loader which is based on how long the key is pressed for

        // start the keypress

        var newShotFriends = this.state.shotFriends;
        var friend = this.state.friends[0];
        friend.velocity = Math.random() * 400 + 600;
        friend.angle = Math.random() * 50 + -70;
        friend.speed = 10;
        friend.shot = false;
        friend.value = Math.random() * 1000 - 500;
        newShotFriends.push(friend);

        this.setState({
            spaceKey: true,
            friend: this.state.friend + 1,
            shotFriends: newShotFriends,
            friends: this.state.friends.slice(1, this.state.friends.length)
        });

    },
    componentDidMount: function() {
        keymaster('space', this.onSpaceKey)
    },

    componentWillUnmount: function() {
        keymaster.unbind('space', this.onSpaceKey)
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },
    componentDidUpdate: function() {

        // todo perhaps update the shot friends array immediately on shooting then remove them once they have been
        // set in motion via tweenlite

        if (this.state.shotFriends.length) {
            // todo loop over all shot friends and only start the ones which need starting
            var friend = this.state.shotFriends[0];

            var ball = "#" + friend.identifier,
                velocity = friend.velocity, // 1 - 1000
                angle = friend.angle, // -20 to -70 degrees
                speed = friend.speed,
                self = this;

            TweenLite.to(ball, speed, {
                physics2D: {
                    velocity: velocity,
                    angle: angle,
                    gravity: 600,
                    xProp: 'left',
                    yProp: 'top'
                }
            });

            collisionTimer = setInterval(function() {
                self.collision();
            }, 30);
        }


    },

    render: function () {

        var nextFriend = this.state.friends.slice(0, 1).map(function(friend) {
            return (
                <div className="ball" key={friend.identifier} id={friend.identifier}>
                    <img src={friend.picture.data.url}  alt={friend.name} width={50} height={50} />
                </div>
            );
        });

        var upcomingFriends = this.state.friends.slice(
            1,
            this.state.friends.length
        ).map(function(friend) {
            return (
                <div className="next-ball" id={friend.identifier} key={friend.identifier}>
                    <img src={friend.picture.data.url}  alt={friend.name} width={50} height={50} />
                </div>
            );
        }).splice(0,10);


        var airFriends = this.state.shotFriends.map(function(friend) {
            return (
                <div className="ball" id={friend.identifier} key={friend.identifier}>
                    <img src={friend.picture.data.url}  alt={friend.name} width={50} height={50} />
                </div>
            );
        });

        return (
            <Grid className="game">
                        {nextFriend}
                        {airFriends}
                        <p className="jeremy" id="jeremy">Jeremys mouth space</p>
                <Row>

                    <Col xs={12}>
                        <p>Score: {this.state.score}</p>
                    </Col>

                </Row>
                <Row>
                    <Col xs={12}>
                        {upcomingFriends}
                    </Col>
                </Row>

            </Grid>
        )
    }


});



module.exports = Game;
