import React from 'react';
// import SoundPlayer from '../../components/SoundPlayer/SoundPlayer.component';
import Visualizer from '../../components/Visualizer/Visualizer.component';
import PlayerBar from '../../components/PlayerBar/PlayerBar';
import classes from './App.module.scss';
// import UploadSong from '../../components/UploadSong/UploadSong';
import HamburgerToggle from '../../components/HamburgerToggle/HamburgerToggle';
import VisualPanel from '../../components/VisualPanel/VisualPanel';

let soundReset = {
    isPlaying: false
};

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            uploadedSong: null,
            isSongLoaded: false,
            volume: 0.5,
            ...soundReset,
            togglePanel: false
        };
    }

    /********************************************
        Handles changing of volume state upon
        slider interaction. State changes are sent to
        sketch file adjusting the sound's actual
        volume to change ellipse diameter on redraw.
    ********************************************/
    onVolumeChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    /*********************************************
        Handles toggling of pause/play button.
        Used to monitor if the user wants to pause/play
        the loaded sound. State changes are sent to
        sketch file which executes a .pause() or .play()
        command.
    *********************************************/
    onPlayPress = event => {
        const { uploadedSong } = this.state;

        if (uploadedSong) {
            this.setState({ isPlaying: !this.state.isPlaying }, () => {
                this.setState({
                    buttonText: this.state.isPlaying ? 'Pause' : 'Play'
                });
            });
            console.log(this.state);
        } else {
            alert('No file loaded');
        }
    };

    /********************************************
        Handle file uploads. Uploaded file is saved
        as state and is passed down to the sketch file as props.
        Sketch then loads the file using p5.Sound library.
    *********************************************/
    onFileUpload = event => {
        const song = event.target.files[0];
        this.setState({
            uploadedSong: song,
            isSongLoaded: true,
            ...soundReset
        });
    };

    onTogglePanel = () => {
        this.setState({togglePanel:!this.state.togglePanel})
    }

    render() {
        const {
            uploadedSong,
            isSongLoaded,
            volume,
            isPlaying,
            onSongEnd,
            togglePanel
        } = this.state;
        return (
            <div className={classes.pageContainer}>
                <div className={classes.visualContainer}>
                    {
                        togglePanel?
                        <div className={classes.visualPanel}>
                            <VisualPanel />
                        </div>
                        :
                        null
                    }    
                    <div className={`${classes.visualmusic} ${togglePanel?classes.shrink:''}`}>
                        <div className={classes.hamburger}>
                            <HamburgerToggle onClick={this.onTogglePanel}/>
                        </div>
                        <Visualizer
                            volume={volume}
                            isPlaying={isPlaying}
                            uploadedSong={uploadedSong}
                            onSongEnd={onSongEnd}
                        />
                    </div>
                </div>    
                <div className={classes.bar}>
                    <PlayerBar
                        volume={volume}
                        onVolumeChange={this.onVolumeChange}
                        onFileUpload={this.onFileUpload}
                        onPlayPress={this.onPlayPress}
                        isPlaying={isPlaying}
                        uploadedSong={uploadedSong}
                        isSongLoaded={isSongLoaded}
                    />
                </div>
            </div>
        );
    }
}

export default App;
