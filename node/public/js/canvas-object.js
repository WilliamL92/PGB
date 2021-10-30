function addImg(){
    canvasType = "drag"
    let stageGrid = gridCoord({width: $('#container').width(), height: $('#container').height(), size: 16, scale: 1, x:0, y:0})
    for(let h = 0; h < spritesSelected.length; h++){
        const imageObj = new Image()
        imageObj.onload = function () {
            const mySprite = new Konva.Image({
            x: 16*h,
            y: 0,
            image: imageObj,
            name: "sceneObject"
            })
            layer.add(mySprite)
    
            stage.off('mousemove')
            stage.on('mousemove', ()=>{
                for(let o = 0; o < stageGrid.length; o++){
                    if(stage.getRelativePointerPosition().x > stageGrid[o].x1 && stage.getRelativePointerPosition().x < stageGrid[o].x1 + tileWidth){
                        mySprite.x(stageGrid[o].x1)
                    }
                    if(stage.getRelativePointerPosition().y > stageGrid[o].y1 && stage.getRelativePointerPosition().y < stageGrid[o].y1 + tileWidth){
                        mySprite.y(stageGrid[o].y1)
                    }
                    layer.draw()
                }
            })
            layer.draw()
        }
        imageObj.src = spritesSelected[h]
    }
}

$(window).on('load', ()=>{
    stage.on('click', ()=>{
        stage.off('mousemove')
        if(canvasType ==" drag"){
            canvasType = "none"
            const allObj = stage.getAllIntersections({x: stage.getRelativePointerPosition().x, y: stage.getRelativePointerPosition().y})
            if(allObj.length != 2){
                allObj[1].remove()
                layer.draw()
            }
        }
    })
})