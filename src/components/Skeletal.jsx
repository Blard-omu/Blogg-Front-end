import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import image from '../assets/images/undraw_photo_re_5blb.svg'

const Skeletal = () => {
  return (
    <div>
      <Card style={{ width: '400px', height:'100%' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
            <Placeholder xs={6} /> <Placeholder xs={8} />
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Skeletal
