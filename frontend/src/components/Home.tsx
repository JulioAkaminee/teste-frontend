    

function Home() {
  return (
    <div className="flex justify-center items-center flex-col bg-background" >
       <h1 className="font-bold flex justify-center text-white m-10 text-4xl">Find People</h1>

       <input type="search" name="searchUsers" id="SearchUsers" placeholder="Search people..." className="bg-transparent w-4/12 rounded-xl p-3 mt-4 border-2 outline-none text-white"  />
             <hr className="border-white w-full my-6" />  
    </div>
  );    
}

export default Home;
