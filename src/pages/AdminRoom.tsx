import { useNavigate, useParams } from 'react-router-dom';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import RoomCode  from '../components/RoomCode';
import Logo from '../components/Logo';
import ThemeSwitch from '../components/ThemeSwitch';

import { useRoom } from '../hooks/useRoom';

import { database, ref, remove, update } from '../services/firebase';

import { PageRoomHeader, PageRoomMain } from '../styles/room-styles'; 

type RoomParams = {
  id: string;
}

interface AdminRoomProps {
  toggleTheme: () => void;
}

export function AdminRoom({ toggleTheme }: AdminRoomProps) {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId || '');   
  const history = useNavigate();

  async function handleEndRoom() {
    const roomRef = ref(database, `rooms/${roomId}`)    
    await update(roomRef, {
      endedAt: new Date()
    })

    history('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    const questioRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
    await update(questioRef, {
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string){
    const questioRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
    await update(questioRef, {
      isHighlighted: true
    })
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
      const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
      await remove(questionRef);
    }
  }

  return (
    <div id='page-room'>
      <PageRoomHeader>
        <div className='content'>
          <Logo />
          <div>
            <RoomCode code={roomId || ''}/>
            <Button isOutlined
              onClick={() => handleEndRoom()}
            >Encerrar Sala</Button>
            <ThemeSwitch toggleTheme={toggleTheme} />
          </div>
        </div>
      </PageRoomHeader>

      <PageRoomMain className='content'>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>           
        
        <div className='question-list'>
        {questions.map(question => {
          return(
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >        
              {!question.isAnswered && (
                <>
                  <button
                  type='button'
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt='Marcar pergunta como respondida' />  
                  </button>    
                  <button
                    type='button'
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt='Dar destaque a pergunta' />  
                  </button>    
                </>
              )}
              <button
                type='button'
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt='Remover pergunta' />  
              </button>    
            </Question>
          );
        })}
        </div>
      </PageRoomMain>
    </div>
  );
}