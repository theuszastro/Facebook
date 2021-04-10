const StoriesArray = [
   { name: '', content: '', avatar: '' },
   {
      name: 'Edson Davi Fogaça',
      content: 'https://i.pinimg.com/originals/4c/94/15/4c94153ee21d1da42643e6e0eb5aa550.jpg',
      avatar:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNrlA22Cgv_C8itJzrl8TN_HTJlkePZbbFYA&usqp=CAU',
   },
   {
      name: 'Mariana Josefa Barbosa',
      content:
         'data:image/jpeg;base64,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',
      avatar:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlpK2qLiYURaOBRaa64w2TJpLPHtZKkCbohw&usqp=CAU',
   },
   {
      name: 'Mateus Cláudio Ryan Aparício',
      content:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_wVC36VlpBo4NGURjwFgzMQKYiq2GuK89A&usqp=CAU',
      avatar:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_za2qUDPatc8Xd3Jy3Dft0c1bUR32PGNRDQ&usqp=CAU',
   },
   {
      name: 'Giovana Priscila Pires',
      content: 'https://i.pinimg.com/736x/61/1f/1f/611f1fb71cdec4dc0e7eafbe222a4d5a.jpg',
      avatar:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiJqlmvwmqFiHP6yV2jfkRUMFfmWg3Hac5g&usqp=CAU',
   },
];

export { StoriesArray };
