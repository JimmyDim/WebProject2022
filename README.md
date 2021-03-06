# WebProject2022
This is the project for the CEID Web Development Course.

<span style="color:crimson">Jimmy</span>  

<span style="color:mediumspringgreen">Kwstantinos</span>  

<span style="color:skyblue">Mairy</span>  






***

## TASKS / Basic Layout

### Χρήστης

1. Σύνδεση στο σύστημα (`userlogin.ejs`)
Περιλαμβάνει και τα: 
    * Δεν έχω λογαριασμό --> εγγραφή  (`usersignup.ejs`)
    * Διαχειριστής --> είσοδος εδώ (`adminlogin.ejs`)
    1. Στήσιμο Βάσης Δεδομένων
    2. Backend (Σύνδεση με ΒΔ, εκτέλεση απαραίτητων λειτουργιών)
    3. Frontend (Απλά html στοιχεία χωρίς styles)
    4. Test ( Δοκιμή ότι όλα δουλέυουν όπως πρέπει)
    5. Beautify (Styles, Themes etc.)
    

2. Εγγραφή στο σύστημα (`usersignup.ejs`)
    1. Backend 
    2. Frontend 
    3. Test 
    4. Beautify

3. Αρχική απεικόνιση χάρτη (`homepage.ejs`)
    * Έχει επιλογή για αποσύνδεση
    * "Επεξεργασία προφίλ" (`profile.ejs`)
    * Χάρτης
    * Βλέπουμε την τωρινή τοποθεσία του χρήστη 
    * Υπάρχει πεδίο αναζήτησης πάνω στον χάρτη
    * Περιλαμβάνει το "Αναζήτηση σημείων ενδιαφέροντος":
        - Αναζήτηση POIs 
        - Απεικόνιση ως markers με συγκεκριμένο χρώμα στο χάρτη
        - Pop-up κάθε marker με εκτίμηση επισκεψιμότητας & ΜΟ επισκεπτών + "Καταχώρηση επίσκεψης": για τα POIs εντός 20μ καταχώρηση επίσκεψης χρήστη και εκτίμηση επισκεπτών
    * "Δήλωση Κρούσματος" (`editCovidStatus.ejs`) Σε άλλη σελίδα ή όχι ;
    * "Πιθανή επαφή με κρούσμα" (`checkcontact.ejs`) Σε άλλη σελίδα ή όχι ;

    1. Εύρεση και set up κατάλληλου map package 
    2. Back
    3. Front
    4. Test
    5. Beautify

4. "Δήλωση Κρούσματος" (`editCovidStatus.ejs`)
    * Ναι / άκυρο
    * Ημερομηνία 
    1. Εύρεση/σχεδιασμός κατάλληλου Layout σελίδας
    2. Backend 
    3. Frontend 
    4. Test 
    5. Beautify

     Περιγραφή: Επιλογή μέσω κουμπιού στο μενού του χρήστη ότι είναι θετικός. Αυτο κάνει τα εξής:

     -Έλεγχο current_datetime > positive_datetime + 14 (λόγω εκφώνησης)
     -Αν οκ, αλλαγή πεδίου user.positive = true και positive_datetime = current_datetime

     -Αναζήτηση στον πίνακα visits για όλα τα visit με το τρέχον userId τις τελευταίες 7 μέρες (στα visit υπάρχει πεδίο visit.createdOn για χρόνο) 
     -Βάζουμε στα visit που ισχύει visit.positive = true; //Αυτό τα ορίζει σαν επισκέψεις κρούσματος)

     (Τα δυο τελευταία τα κάνουμε εδώ για να μας βοηθήσουν σε άλλα ερωτήματα)


5. "Πιθανή επαφή με κρούσμα" (`checkcontact.ejs`)
    * Λίστα με τα POIs που επισκέφτηκε
    1. Εύρεση/σχεδιασμός κατάλληλου Layout σελίδας
    2. Backend 
    3. Frontend 
    4. Test 
    5. Beautify

    Περιγραφή: Κουμπί που κάνει τα εξής:

    -Αναζήτηση στα visit για όλα τα visits με το τρέχον userId τις τελευταίες 7 μέρες (στα visits υπάρχει πεδίο visit.createdOn). 

    -για κάθε visit, αναζητούμε πάλι στον πίνακα visits για άλλα visit με ίδιο poiId (δηλαδή μέρος) και με visit.CreatedOn (datetime) +-2ώρες. Στέλνουμε πίσω τα visits που βρήκαμε.

    -Στο frontend μπορούμε να του πουμε πλέον πού και πότε ήρθε σε πιθανή επαφή με κρούσμα, καθώς και πόσες φορές την τελευταία εβδομάδα. 

6. "Επεξεργασία προφίλ" (`profile.ejs`)
    * Αλλαγή username/password
    * Ιστορικό επισκέψεων
    * Ιστορικό δήλωσης κρουσμάτων
    1. Εύρεση/σχεδιασμός κατάλληλου Layout σελίδας
    2. Backend 
    3. Frontend 
    4. Test 
    5. Beautify

***

     


### Διαχειριστής


1. Σύνδεση στο σύστημα (`adminlogin.ejs`)
    * Δεν είμαι διαχειριστής --> (`userlogin.ejs`)
    1. Στήσιμο Βάσης Δεδομένων
    2. Backend
    3. Frontend
    4. Test 
    5. Beautify

2. "Ανέβασμα, ενημέρωση και διαγραφή δεδομένων" (`admin.ejs`)
    * CRUD POIs
    1. Εύρεση/σχεδιασμός κατάλληλου Layout σελίδας
    2. Backend 
    3. Frontend 
    4. Test 
    5. Beautify

3. "Απεικόνιση Στατιστικών" (`statistics.ejs`)
    *  Συνολικός αριθμός επισκέψεων που έχουν καταγραφεί
    *  Συνολικός αριθμός κρουσμάτων που έχουν δηλωθεί
    * Συνολικός αριθμός επισκέψεων από ενεργά κρούσματα
    * Κατάταξη των κατηγοριών σημείων ενδιαφέροντος
    * Εμφάνιση διαγραμμάτων
    1. Εύρεση/σχεδιασμός κατάλληλου Layout σελίδας
    2. Εύρεση κατάλληλου package για τα διαγράμματα
    3. Backend 
    4. Frontend 
    5. Test 
    6. Beautify
