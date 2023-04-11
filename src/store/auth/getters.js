export function getMe (state) {
  return state.me
}

export function getLinks (state) {
  let user = JSON.parse(localStorage.getItem('userInfo'))
  let userRole = user.role.code ? user.role.code : user.role_info.code 
  if (userRole === 'contractor') {
    return [
      {
        title: 'Профиль',
        link: '/contractor/profile/2',
      },
      {
        title: 'Проекты',
        link: '/projects',
      },
      {
        title: 'Сметы',
        link: '/estimates',
      },
      {
        title: 'Финансы',
        link: '/finance',
      },
      {
        title: 'Заказчики',
        link: '/clients',
      },
      {
        title: 'Подрядчики',
        link: '/contractor',
      },
      {
        title: 'Документы',
        link: '/documents',
      },
    ]
  } 
  if (userRole === 'designer') {
    return [
      {
        title: 'Профиль',
        link: '/designer/profile/2',
      },
      {
        title: 'Проекты',
        link: '/projects',
      },
      {
        title: 'Сметы',
        link: '/estimates',
      },
      {
        title: 'Финансы',
        link: '/finance',
      },
      {
        title: 'Заказчики',
        link: '/clients',
      },
      {
        title: 'Дизайнеры',
        link: '/designers',
      },
      {
        title: 'Документы',
        link: '/documents',
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