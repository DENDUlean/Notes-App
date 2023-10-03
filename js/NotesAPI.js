// zde exportujeme class NotesAPI se všemi metody
export default class NotesAPI{

    // zde vytváříme metodu gettAllNotes, která nám "stahuje" veškerá data ze local storage
    static getAllNotes(){
        // zde nám to vrátí data ze local storage a pokud nejsou žádná vrátí nám to prázdné pole
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        // zde vytváříme sort algoritmus podle updated datumu vytvoření
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    // zde vytváříme metodu saveNote, která vytvoří a uloží veškerí notes
    static saveNote(noteToSave){
        const notes = NotesAPI.getAllNotes();
        // zde hledáme existující note podle id, který poté uloží do proměnné existing
        const existing = notes.find(note => note.id == noteToSave.id);

        // pokud exsituje note se stejným id... (Edit/update)
        if(existing){

            // přepisujeme původní data za nová
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        }else{
            // generujeme náhodné id
            noteToSave.id = Math.floor(Math.random() * 1000000);
            // zde tvoříme aktualizujeme čas vytvoření pomocí nového datového objektu
            noteToSave.updated = new Date().toISOString();
            // přidáváme do seznamu
            notes.push(noteToSave);
        }

        // zde opět poté znova přeuložíme local storage key
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    // zde vytváříme metodu deleteNote, která přímá argument id a poté note vymaže podle něj
    static deleteNote(id){
        // vytváříme proměnnou notes, které voláme všechny notes
        const notes = NotesAPI.getAllNotes();
        // a poté zde vytváříme novou proměnnou newNotes, ve které filtrujeme a hledáme to id, které se nerovná všem ostatním
        const newNotes = notes.filter(note => note.id != id);
        // a zde ho poté přepíšeme a vymažeme ze seznamu celý note
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}