

export const filteredData = (oldData, filerterContent) => {
    console.log(filerterContent)
 const {age,gender,country,town} = filerterContent;

 return oldData.filter(data => data.age > +age || data.gender === gender || data.country === country || data.from === town)
// return oldData

}