import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, ref , get } from '../services/firebase';

import illustrtionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import ThemeSwitch from '../components/ThemeSwitch';

import '../styles/auth.scss';

import { PageHomeHeader } from '../styles/auth';

type HomeProps = {
  toggleTheme(): void;
}

export function Home({ toggleTheme }: HomeProps) {
  const history = useNavigate();
  const {user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle();
    }

    history('/rooms/new');    
  };

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()

    if(roomCode.trim() === ""){
      return;
    }

    const roomRef = ref(database, `rooms/${roomCode}`)

    
    if(!(await get(roomRef)).exists()){      
      alert('Room does not exists.');
      return;
    }

    if((await get(roomRef)).val().endedAt){
      alert('Room already closed.');
      return;
    }

    history(`/rooms/${roomCode}`)
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrtionImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <PageHomeHeader>
            <ThemeSwitch toggleTheme={toggleTheme} />
          </PageHomeHeader>
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digiet o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}