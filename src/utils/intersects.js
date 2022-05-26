function intersects( a, b ) {
    return(
        (
          (
            ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
          ) && (
            ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
          )
        )||(
          (
            ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
          ) && (
            ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
          )
        )
      )||(
        (
          (
            ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
          ) && (
            ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
          )
        )||(
          (
            ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
          ) && (
            ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
          )
        )
      );
}

const checkIntersectSelection = (pos, selection) => {
    const rect1 = {
        x: pos.left, 
        y: pos.top, 
        x1: pos.left + pos.width, 
        y1: pos.top + pos.height
    }
    
    const rect2 = {
        x: selection.left, 
        y: selection.top, 
        x1: selection.left + selection.width, 
        y1: selection.top + selection.height
    }
    
    return intersects(rect1, rect2)
}

const checkIntersectDragElem = (pos, posX, posY) => {
  const rect1 = {
    x: pos.left, 
    y: pos.top, 
    x1: pos.left + pos.width, 
    y1: pos.top + pos.height
  }

  const rect2 = {
    x: posX, 
    y: posY, 
    x1: posX, 
    y1: posY
  }

  return intersects(rect1, rect2)
}

export {checkIntersectSelection, checkIntersectDragElem}