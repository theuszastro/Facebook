const dataRules = {
   '/user': {
      put: {
         fields: [
            'firstname',
            'lastname',
            'email',
            'phone',
            'password',
            'sex',
            'pronoun',
            'date_birth',
            'online',
            'theme',
         ],
         length: 1,
      },
   },
   '/register': {
      post: {
         fields: [
            'firstname',
            'lastname',
            'email',
            'phone',
            'password',
            'sex',
            'pronoun',
            'date_birth',
         ],
         length: 7,
      },
   },
   '/post': {
      post: {
         fields: ['description', 'files'],
         length: 1,
      },
      put: {
         fields: ['description', 'oldFiles', 'files'],
         length: 1,
      },
   },
   '/solicitation': {
      post: {
         fields: ['to'],
         length: 1,
      },
      put: {
         fields: ['status'],
         length: 1,
      },
   },
   '/like': {
      post: {
         fields: ['reaction', 'post'],
         length: 2,
      },
   },
};

export { dataRules };
