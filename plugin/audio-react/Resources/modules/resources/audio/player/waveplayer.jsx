import React from 'react'
import {actions} from '#/plugin/audio-react/resources/audio/actions'
import {connect} from 'react-redux'
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer'
import 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min'
import 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
import 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import {PropTypes as T} from 'prop-types'


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
      regionActive:null
    }
    this.ToogglePlay= this.ToogglePlay.bind(this)
    this.regionAdd= this.regionAdd.bind(this)
    this.regionPlay = this.regionPlay.bind(this)
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
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
    // regionList.forEach((region,index,object) => {
    //   if(region.id == this.state.wavesurfer.regionActive.id)
    //     object.splice(index, 1)
    // })
  }

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
  }
}

WavePlayer.propTypes = {
  src: T.string.isRequired
}

export default connect(
  state=>({
    url: state.url
  }), 
  (dispatch)=>({
    addRegion :(region)=>dispatch(actions.addRegionToPlayer(region))
  }))(WavePlayer)

