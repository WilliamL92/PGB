$(window).on('load', ()=>{
    $('#importTileset').on('change', ()=>{
        let files = $('#importTileset').get(0).files
        for(let i = 0; i < files.length; i++){
            if (files[i].type == "image/jpeg" || files[i].type == "image/png" || files[i].type == "image/jpg") {
                let reader = new FileReader()
                reader.onload = ()=>{
                    getTileSet(reader.result, (tab)=>{
                        let fileName = files[i].name.split('.')
                        fileName.splice(-1,1)
                        fileName.join('')
                        if(fileName.length >= 10){
                            fileName = fileName.substring(0, 7) + "..."
                        }
                        projectData.libraryMedia.currentId++
                        projectData.libraryMedia.tab.push({
                            type: "file",
                            data: tab,
                            name: fileName,
                            id: projectData.libraryMedia.currentId
                        })
                        if(i == files.length-1){
                            loadLibraryMedia(projectData.libraryMedia)
                        }
                    })
                }
                reader.readAsDataURL($('#importTileset').get(0).files[i])   
            }
            else{
                console.log("NOT IMAGE !!")
            }
        }
    })
})