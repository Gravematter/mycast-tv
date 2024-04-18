import { React } from 'react'

function ChannelBars({ channels, changeChannel, updatePreview }){
    const channelData = channels.map(
        (row, i)=>{return(
            <tr key={i} className='channel' tabIndex={row.id} onDoubleClick={() => changeChannel(row.eplocation)}>
                <td className='channelbar'><h2>{row.name}</h2></td>
                {row.playlist.map(
                    (episode, j)=>{return(
                        <td key={j} colSpan={episode.timeslots} className='episode' tabIndex={row.id} onClick={() => updatePreview(episode.title, episode.timespace, episode.description)}><h2>{episode.title}</h2></td>
                    )}
                )}
            </tr>
        )}
    );

    return channelData;
}
  
export default ChannelBars;