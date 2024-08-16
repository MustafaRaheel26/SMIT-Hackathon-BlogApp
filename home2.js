
import{auth , db} from "./config.js";
import { collection, addDoc , getDocs} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 


const card =document.querySelector('#card');



async function getDataFromFirestore(){
    const arr =[];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
       arr.push(doc.data());
    });
    console.log(arr);
    arr.map((item)=>{
        card.innerHTML += `
           
            <div class="space-y-4">
                
                <div class="bg-white p-4 rounded shadow-md">
                    <h3 class="text-lg font-bold">${item.title}</h3>
                    <p class="text-sm text-gray-500">Posted by <span class="font-bold">Harman Malik</span> - August 10, 2023</p>
                    <p class="mt-2">${item.description}</p>
                    <div class="flex justify-start mt-4">
                        <button class="text-gray-500 hover:text-gray-600">See all from this User</button>
                    </div>
                </div>
        
            </div>
        
        `
    })
}
getDataFromFirestore()