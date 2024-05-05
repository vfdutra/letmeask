import { memo } from 'react';
import copyImg from '../assets/images/copy.svg';

import { PageRoomCode } from '../styles/room-code';

type RoomCodeProps = {
  code: string;
}

function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <PageRoomCode className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt='Copy room code' />
      </div>
      <span>Sala #{props.code}</span>
    </PageRoomCode>
  )
}

export default memo(RoomCode);