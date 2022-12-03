import React from 'react'

const ServerError = () => {
  return (
    <div className="px-4 pt-8 w-full max-w-980px mx-auto flex flex-col items-center">
      <div className="text-5xl font-bold">Server Error</div>
      <div className="text-xl px-4 py-6 text-center">We track these errors automatically, but if the problem persists feel free to contact us. <br/> In the meantime, try refreshing.</div>
    </div>
  )
}

export default ServerError