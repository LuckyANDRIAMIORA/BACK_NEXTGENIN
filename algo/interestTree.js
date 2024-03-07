let tree = [
    {
        interest: "Interest",
        parent: 'null',
        childes: [
            {
                interest: "Maths",
                parent: 'Interest',
            },

            {
                interest: "Design",
                parent: 'Interest',
            }
        ]
    },

    {
        interest: "Maths",
        parent: 'Interest',
        childes: [
            {
                interest: "Problem Solving",
                parent: 'Maths',
            },

            {
                interest: "mathematic modeling",
                parent: 'Maths',
            }
        ]
    },

    {
        interest: "Design",
        parent: 'Interest',
        childes: [
            {
                interest: "UX/UI",
                parent: 'Design',
            }
        ]

    }

]

let getTree = () => {
    let treeDict = {};
    tree.forEach(e => {
        treeDict[e.interest]=e
    });
    return treeDict 
}

let searchTree = (interest)=>{
    let treeDict = getTree()
    let interests = []
    if(treeDict[interest]){
        let mainInterest=treeDict[interest]
        interests.push(interest)
        mainInterest.parent != "null" && mainInterest.parent != "Interest"? interests.push(mainInterest.parent):null,
        mainInterest.childes.forEach(element => {
            interests.push(element.interest)            
        });
    }
    console.log(interests)
}

searchTree("Design")