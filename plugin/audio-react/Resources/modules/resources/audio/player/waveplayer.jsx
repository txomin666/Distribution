import React from 'react'
import {actions} from '#/plugin/audio-react/resources/audio/actions'
import {connect} from 'react-redux'
<<<<<<< HEAD
import {select as resourceSelect} from '#/main/core/resource/selectors'
import WaveSurferControl from '#/plugin/audio-react/resources/audio/player/components/wavesurfer-control'
import WaveSurferRegionList from '#/plugin/audio-react/resources/audio/player/components/wavesurfer-list-region'
=======
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer'
import 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min'
import 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
import 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import {PropTypes as T} from 'prop-types'

<<<<<<< HEAD
=======

>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
/**
 * Simple example of a React component with a Wavesurfer
 */
class WavePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.wavesurfer = null
    this.state = {
      audioFile: this.props.src,
      playing: false,
      pos: 0,
      volume: 0.5,
      audioRate: 1,
<<<<<<< HEAD
      regionActive: null
    }
    this.ToogglePlay = this.ToogglePlay.bind(this)
    this.regionAdd = this.regionAdd.bind(this)
    this.regionPlay = this.regionPlay.bind(this)
    this.regionReset = this.regionReset.bind(this)
    this.regionActiveUpdate = this.regionActiveUpdate.bind(this)
=======
      regionActive:null
    }
    this.ToogglePlay= this.ToogglePlay.bind(this)
    this.regionAdd= this.regionAdd.bind(this)
    this.regionPlay = this.regionPlay.bind(this)
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
<<<<<<< HEAD
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
=======
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
      return v.toString(16)
    })
  }


  componentDidMount() {
    let $waveform = document.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: $waveform,
      waveColor: 'blue',
      progressColor: 'purple'
    })
    this.wavesurfer.load(this.props.src)

    /** Clic on region */
<<<<<<< HEAD
    this.wavesurfer.on('region-click', r => {
      this.setState({regionActive: r})
    })

    /** Created on region */
    this.wavesurfer.on('region-created', r => {
      
    })

    /** Deleted on region */
    this.wavesurfer.on('region-delected', r => {})

    /** Deleted on region */
    this.wavesurfer.on('region-dblclick', (r, e) => {
      this.wavesurfer.play(r.start, r.end)
    })

    /** Initialize First Region on WaveSurfer */
    this.wavesurfer.on('ready', () => {
      let r = {
        id: this.uuidv4(),
        start: 0,
        end: this.wavesurfer.getDuration(),
        color: 'rgba(14, 90, 60, 0.1)'
      }
      this.wavesurfer.addRegion(r)
      this.props.updateRegions(this.wavesurfer.regions.list)
      this.setState({regionActive: r},()=>{
        this.props.updateActiveRegion(r)
      })
    })
  }

  /** Play - Pause  */
  ToogglePlay() {
    this.wavesurfer.playPause()
    if (this.state.playing) this.setState({playing: false})
    else this.setState({playing: true})
  }

  regionAdd() {
    if (this.state.regionActive && this.wavesurfer.getCurrentTime() > 0) {
      delete this.wavesurfer.regions.list[this.state.regionActive.id]
      let first = {
        id: this.uuidv4(),
        start: this.state.regionActive.start,
        end: this.wavesurfer.getCurrentTime(),
        color: 'rgba(255, 0, 0, 0.5)',
        drag:true,
        resize:true
      }

      let second = {
        id: this.uuidv4(),
        start: this.wavesurfer.getCurrentTime() + 0.001,
        end: this.state.regionActive.end,
        color: 'rgba(255, 0, 0, 0.5)',
        drag:true,
        resize:true        
      }
      this.wavesurfer.addRegion(first)
      this.wavesurfer.addRegion(second)
      /** Update State Regions */
      this.props.updateRegions(this.wavesurfer.regions.list)
    }
  }

  regionRemove() {
=======
    this.wavesurfer.on('region-click',(r)=>{
      this.setState({regionActive:r})
    }) 

    /** Created on region */
    this.wavesurfer.on('region-created',(r)=>{


    }) 

    /** Deleted on region */
    this.wavesurfer.on('region-delected',(r)=>{

    }) 

    /** Deleted on region */
    this.wavesurfer.on('region-dblclick',(r,e)=>{
      console.log(r.end)
      this.wavesurfer.play(r.start,r.end)
    
    }) 

    /** Initialize First Region on WaveSurfer */
    this.wavesurfer.on('ready',()=>{
      let r = {id:this.uuidv4(),start:0,end:this.wavesurfer.getDuration()-0.01}
      this.wavesurfer.addRegion(r)
      this.setState({regionActive:r})
    })  
    
  } 



  /** Play - Pause  */
  ToogglePlay(){
    this.wavesurfer.playPause()
    if(this.state.playing)
      this.setState({playing:false})
    else 
      this.setState({playing:true})
  }



  regionAdd(){
    if(this.state.regionActive){
      delete this.wavesurfer.regions.list[this.state.regionActive.id]
      let first = {
        id:this.uuidv4(),
        start:this.state.regionActive.start,
        end:this.wavesurfer.getCurrentTime(),
        color:'rgba(14, 90, 60, 0.4)'
        
      }  

      let second = {
        id:this.uuidv4(),
        start:this.wavesurfer.getCurrentTime()+0.01,
        end:this.state.regionActive.end,
        color:'rgba(56, 90, 100, 0.4)'


      }
      this.wavesurfer.addRegion(first)
      this.wavesurfer.addRegion(second)
        
    }
  }

  regionRemove(){
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
    // regionList.forEach((region,index,object) => {
    //   if(region.id == this.state.wavesurfer.regionActive.id)
    //     object.splice(index, 1)
    // })
  }

<<<<<<< HEAD
  regionActiveUpdate(r){
    //console.log(r)
  }

  regionReset() {
    if (this.wavesurfer) this.wavesurfer.clearRegions()
  }

  regionPlay() {
   
    this.wavesurfer.play(
      this.state.regionActive.start,
      this.state.regionActive.end
    )
  }

  regionSelect(region){
    let r = {
      id: region.id,
      start: region.start,
      end: region.end,
      color: region.color
    }
    this.setState({regionActive: r},()=>{
      this.props.updateActiveRegion(r)
    })
    
  }
  
  render() {
    
    if (this.props.edit)
      return (
        <div>
          <div className="player-react">
            <div className="wave" />
          </div>
          <WaveSurferControl
            playing={this.state.playing}
            toogglePlay={this.ToogglePlay}
            regionAdd = {this.regionAdd}
            regionPlay ={this.regionPlay}
            regionReset= {this.regionReset}
          />
          <WaveSurferRegionList
            regionSelect={this.regionSelect.bind(this)}
            regionPlay = {this.regionPlay}
          />
        </div>
      )

    if (!this.props.edit)
      return (
        <div>
          <div className="player-react">
            <div className="wave" />
          </div>
          <div className="row ">
            <div className="col-xs-1 col-md-offset-5 player-react-control">
              <button className="btn btn-default " onClick={this.ToogglePlay}>
                {' '}
                <span
                  className={`fa big ${this.state.playing
                    ? 'fa-pause'
                    : 'fa-play'}`}
                />
              </button>
            </div>
          </div>
        </div>
      )
=======
  regionPlay(){
    this.wavesurfer.play(this.state.regionActive.start,this.state.regionActive.end)
  }

  render() {
    return (
      <div>
        <div className='player-react'>
          <div className='wave'></div>
        </div>
        <div className="row ">
          <div className="col-xs-4 col-md-offset-4 player-react-control">
            <button className="btn btn-primary " onClick={this.ToogglePlay}> <span className={`fa big ${this.state.playing ? 'fa-pause' : 'fa-play'}`}></span></button>
            <button className="btn btn-success " onClick={this.regionAdd}> <span className='fa fa-flag'></span></button>
            <button className="btn btn-primary " onClick={this.regionPlay}> <span className='fa fa-repeat'></span></button>
          </div>
        </div>
      </div>

    )
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
  }
}

WavePlayer.propTypes = {
<<<<<<< HEAD
  src: T.string.isRequired,
  edit: T.bool.isRequired,
  updateRegions:T.func.isRequired,
  updateActiveRegion:T.func
}

export default connect(
  state => ({
    url: state.url,
    editable: resourceSelect.editable(state),
    regions:state.regions.list
  }),
  dispatch => ({
    updateRegions: regions => dispatch(actions.updateRegionsPlayer(regions)),
    updateActiveRegion:region =>dispatch(actions.updateRegionActivePlayer(region))
  })
)(WavePlayer)
=======
  src: T.string.isRequired
}

export default connect(
  state=>({
    url: state.url
  }), 
  (dispatch)=>({
    addRegion :(region)=>dispatch(actions.addRegionToPlayer(region))
  }))(WavePlayer)

>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
