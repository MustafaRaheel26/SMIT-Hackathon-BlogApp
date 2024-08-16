import {onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{auth , db} from "./config.js";
import { collection, addDoc , getDocs, getFirestore, doc, deleteDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 


const user = auth.currentUser;
const logoutBtn = document.querySelector("#logout-btn");
const title =document.querySelector('#title');
const description =document.querySelector('#description');
const form =document.querySelector('#form');
const card =document.querySelector('#card')

onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const uid = user.uid;
      console.log(uid); 
    } else {
       window.location = './home2.html';
    }
  });

logoutBtn.addEventListener('click',()=>{
    signOut(auth).then(() => {
        console.log("User Logged Out")
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
}) 

form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    card.innerHTML="";
    // console.log(title.value)
    // console.log(description.value)
    try {
        const docRef = await addDoc(collection(db, "posts"), {
          title: title.value ,
          description: description.value ,
          uid: auth.currentUser.uid
        });
        title.value = "";
        description.value = "";
        console.log("Document written with ID: ", docRef.id);
        getDataFromFirestore();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
})


async function getDataFromFirestore(){
    const arr =[];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
       arr.push(doc.data());
    });
    console.log(arr);
    arr.map((item,index)=>{
        card.innerHTML += `
           
            <div class="space-y-4">
                
                <div class="bg-white p-4 rounded shadow-md">
                    <h3 class="text-lg font-bold">${item.title}</h3>
                    <p class="text-sm text-gray-500">Posted by <span class="font-bold">Harman Malik</span> - August 10, 2023</p>
                    <p class="mt-2">${item.description}</p>
                    <div class="flex justify-start space-x-2 mt-4">
                        <button id="editBtn" class="deleteBtn text-gray-500 hover:text-gray-600">Edit</button>
                        <button id="deleteBtn" class="editBtn text-gray-500 hover:text-gray-600">Delete</button>
                    </div>
                </div>
        
            </div>
        `
        let deleteBtn = document.querySelectorAll('#deleteBtn')
        let editBtn = document.querySelectorAll('#editBtn')

        deleteBtn.forEach((btn, index) => {
            btn.addEventListener('click', async () => {
                await deleteDoc(doc(db, "posts", arr[index].id));
                arr.splice(index, 1)
                getDataFromFirestore()
            })
        })

        editBtn.forEach((btn, index) => {
            btn.addEventListener('click', async () => {
                let updateValue = prompt('enter todo')
                const updateDoc = doc(db, "posts", arr[index].id);
                await updateDoc(updateDoc, {
                    todos: updateValue
                });
                arr[index].posts = updateValue
                getDataFromFirestore()
            })
        })
    })
}
getDataFromFirestore()
