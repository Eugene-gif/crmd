export function getMe (state) {
  return state.me
}

export function getUser () {
  return JSON.parse(localStorage.getItem('userInfo'))
}

export function getLinks (state) {
  
  let userRole = getUser().role
  if (userRole === 'contractor') {
    return [
      {
        title: 'Профиль',
        link: '/contractor/profile',
        prefix: null
      },
      {
        title: 'Проекты',
        link: '/projects',
        prefix: '?add=true'
      },
      {
        title: 'Сметы',
        link: '/estimates',
        prefix: null
      },
      {
        title: 'Финансы',
        link: '/finance',
        prefix: '?add=true'
      },
      {
        title: 'Заказчики',
        link: '/clients',
        prefix: '?add=true'
      },
      {
        title: 'Дизайнеры',
        link: '/designers',
        prefix: '?add=true'
      },
      {
        title: 'Документы',
        link: '/documents',
        prefix: '?add=true'
      },
    ]
  } 
  if (userRole === 'designer') {
    return [
      {
        title: 'Профиль',
        link: '/designer/profile',
        prefix: null
      },
      {
        title: 'Проекты',
        link: '/projects',
        prefix: '?add=true'
      },
      {
        title: 'Сметы',
        link: '/estimates',
        prefix: null
      },
      {
        title: 'Финансы',
        link: '/finance',
        prefix: '?add=true'
      },
      {
        title: 'Заказчики',
        link: '/clients',
        prefix: '?add=true'
      },
      {
        title: 'Подрядчики',
        link: '/contractor',
        prefix: '?add=true'
      },
      {
        title: 'Документы',
        link: '/documents',
        prefix: '?add=true'
      },
    ]
  }
  
}

export function getToken (state) {
  return state.token
}

export function isAuthenticated (state) {
  return state.isAuthenticated
}