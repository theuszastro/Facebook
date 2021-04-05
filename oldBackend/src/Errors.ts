import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

const Errors: ErrorRequestHandler = (err, req, res, next) => {
   if(err instanceof JsonWebTokenError)
      return res.status(400).json({ error: 'Token invalido/expirado' });

   switch(err.message){
      case 'without permission':
         return res.status(401).json({ error: 'sem permissão' });

      case 'already accepted':
         return res.status(401).json({ error: 'Essa solicitação já foi aceita!' });

      case 'soliciation same':
         return res.status(400).json({ error: 'Vocẽ não pode se adicionar como amigo!' });

      case 'sem id':
         return res.status(400).json({ error: 'É necessario id do usuário' });

      case 'user inexistente':
         return res.status(400).json({ error: 'Usuário inexistente' });

      case 'Dados invalidos':
         return res.status(400).json({ error: 'Os dados enviados estão invalidos' });

      case 'Comentário invalido':
         return res.status(400).json({ error: 'Comentário não encontrado' });

      case 'compartilhamento':
         return res.status(400).json({ error: 'Compartilhamento não encontrado' });

      case 'email existente':
         return res.status(400).json({ error: 'Usuário já existente com esse email' });

      case 'telefone existente':
         return res.status(400).json({ error: 'Usuário já existente com esse numero' });

      case 'senha invalida':
         return res.status(400).json({ error: 'Senha incorreta' });

      case 'Fazer Login':
         return res.status(400).json({ error: 'É necessario fazer login' });

      case 'Sem Arquivo':
         return res.status(400).json({ error: 'É necessario enviar um arquivo' });

      case 'Post não encontrado':
         return res.status(400).json({ error: 'Esse post não existe' });

      case 'Capa':
         return res.status(400).json({ error: 'Capa não encontrada' });

      case 'Solicitation':
         return res.status(400).json({ error: 'Solicitation não encontrada' });

      case 'Amigo':
         return res.status(400).json({ error: 'Amigo não encontrada' });

      default:
         console.log(err);
         return res.status(500).json({ error: 'Internal server error' });
   }
}

export default Errors;