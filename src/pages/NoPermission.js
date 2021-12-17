import { useLocation } from 'react-router-dom'

const NoPermission = () => {

  let location = useLocation();

  console.log(location)

  return (
    <div>
      <h2>Sorry, 401 Error! You do not have permission to see the {location.pathname} page!</h2>
    </div>
  )
}

export default NoPermission