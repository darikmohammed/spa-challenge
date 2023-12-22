import React from 'react';

function DetailPage({ params }) {
  const { slug } = params;

  return <div> {slug}</div>;
}

export default DetailPage;
