import React from 'react';

export const Small = React.memo(({ value }) => {

    console.log('Me volví a llamar :c ');

    return (
        <small> {value} </small>
  )
})
