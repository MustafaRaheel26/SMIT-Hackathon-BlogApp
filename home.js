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

async function getDataFromFirestore() {
    const arr = [];  
    const querySnapshot = await getDocs(collection(db, 'posts'));  
    
    querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() }); 
    });

    console.log(arr); 
    
    const card = document.getElementById('card'); 
    card.innerHTML = ''; 

    arr.map((item, index) => {
        card.innerHTML += `
            <div class="space-y-4">
                <div class="bg-white p-4 rounded shadow-md">
                    <h3 class="text-lg font-bold">${item.title}</h3>
                    <p class="text-sm text-gray-500">Posted By <span class="font-bold"> Muhammad Abdullah </span> on ${new Date().toLocaleDateString()}</p>
                    <p class="mt-2">${item.description}</p>
                    <div class="flex justify-start space-x-2 mt-4">
                        <button class="editBtn text-gray-500 hover:text-gray-600" data-id="${item.id}" data-index="${index}">Edit</button>
                        <button class="deleteBtn text-gray-500 hover:text-gray-600" data-id="${item.id}" data-index="${index}">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });


    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const index = e.target.getAttribute('data-index');

            await deleteDoc(doc(db, 'posts', id));  
            arr.splice(index, 1);  
            getDataFromFirestore();  
        });
    });

    
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const index = e.target.getAttribute('data-index');

            const updateValue = prompt('Enter new value for the post:');
            if (updateValue) {
                const updateDocRef = doc(db, 'posts', id);

                await updateDoc(updateDocRef, {
                    description: updateValue 
                });

                arr[index].description = updateValue;  
                getDataFromFirestore();  
            }
        });
    });
}


getDataFromFirestore();
