/*
Names: Calvin Todd and Alice Fischer
Class: CS 340
Assignment: Assignment 4 - Data Manipulation Queries
*/

/*
Notes:
All user passed variables will use a $ before the variable.  $example.
There will be some hidden variables passed as well, will annotate with $$. $$example.
Will provide comments in code for clarity
*/

/*Client Data Manipulation Queries*/

/*Add New Client*/
INSERT INTO Clients (fname, lname, phone, email, address, city)
VALUES ($add_client_fname, $add_client_lname, $add_client_phone, $add_client_email, $add_client_street, $add_client_city);

/*Retrieve Client's Record*/
SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City'
FROM Clients cl
WHERE ($firstname = fname
  AND $lastname = lname)
  OR ($$client_id = client_id);

/*The OR Client_id will be used if the query returns multiple records the first query in
case two people with the same name are in the DB.  A lot of this will be handled
in the javascript, otherwise an empty value will be passed in $$client_id.
This is the same in all methods in this section*/

/*IF Consultations flag*/
  SELECT fname AS 'First Name', lname AS 'Last Name', consultation_id AS 'Consultation ID', date AS 'Date', time AS 'Time', completed AS 'Consultation Completed', paid AS 'Paid?', note AS 'Notes'
  FROM Clients cl
  JOIN Consultations co
  USING (client_id)
  WHERE (fname = $fname
    AND lname = $lname)
    OR (client_id = $$client_id);

/*IF Articles flag*/
SELECT article_id AS 'Article ID', date_recommended AS 'Date Recommended', title AS 'Title', publish_date AS 'Publish Date', publication AS 'Publication', author AS 'Author', website AS 'Website' FROM Clients cl JOIN Clients_Articles ca USING (client_id) JOIN Articles a USING (article_id) WHERE (fname = $firstname   AND lname = $lastname)   OR (client_id = $$client_id);


/*If Supplements flag*/
SELECT supplement_id AS 'Supplement ID', date_recommended AS 'Date Recommended', type AS 'Type', brand_name AS 'Brand'
FROM Clients cl
JOIN Clients_Supplements cs
USING (client_id)
JOIN Supplements s
USING (supplement_id)
LEFT JOIN Brands b
USING (brand_id)
WHERE (fname = $firstname
  AND lame = $lastname)
  OR (client_id = $$client_id);

/*Update a Client Record*/
/*Get the current Client Record to Populate Update Fields, handle multiple name records*/
SELECT *
FROM Clients cl
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

/*Update Records*/
Update Clients
SET fname = $fname, lname = $lname, phone = $phone, email = $email, address = $address, city = $city
WHERE (fname = $firstname
  AND lname = $lastname)
  OR (client_id = $$client_id);

/*View Open Invoices for Time Period*/
SELECT consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', completed AS 'Completed', paid AS 'Paid?'
FROM Consultations co
LEFT JOIN Clients cl
USING (client_id)
WHERE paid = 0;

/*Get Client Invoices*/
SELECT fname AS 'First Name', lname AS 'Last Name', date AS 'Consultation Date', paid AS "Paid?", phone AS 'Phone Number', email AS 'Email Address'
FROM Consultations co
LEFT JOIN Clients cl
USING (client_id)
WHERE (fname = $firstname
  AND lname = $lastname)
  OR (client_id = $$client_id);

/*Remove a Client*/
/*Get List for data validation in case there are multiple clients with the same first/last name*/
SELECT *
FROM Clients cl
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

DELETE
FROM Clients
WHERE (fname = $firstname
  AND lname = $lastname)
  OR (client_id = $$client_id);

  /*Consultations Section*/

/*Add a Consultation*/
/*Get List for data validation in case there are multiple clients with the same first/last name*/
SELECT *
FROM Clients cl
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

INSERT INTO Consultations (date, time, client_id)
VALUES ($date, $time, $client_id);

/*View Upcoming Consultations*/
/*Specific Client*/
/*Get List for data validation in case there are multiple clients with the same first/last name*/
SELECT *
FROM Clients cl
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

SELECT consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', date AS 'Date', time AS 'Time'
FROM Consultations
LEFT JOIN Clients
USING (client_id)
WHERE DATEDIFF(DATE_ADD(CURDATE(), INTERVAL $dayRange DAY), date) >= 0
AND date > CURDATE()
AND client_id = $$client_id;

/*Get for All Clients*/
SELECT consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', date AS 'Date', time AS 'Time'
FROM Consultations
LEFT JOIN Clients
USING (client_id)
WHERE DATEDIFF(DATE_ADD(CURDATE(), INTERVAL $dayRange DAY), date) >= 0
AND date > CURDATE();

/*Update a Consultation*/
/*Get List for data validation in case there are multiple clients with the same first/last name*/
SELECT *
FROM Clients cl
LEFT JOIN Consultations co
USING (client_id)
WHERE (fname = $fname
  AND lname = $lname)
  OR (consultation_id = $$consultation_id);

UPDATE Consultations
SET date = $date, time = $time, completed = $completed, paid = $paid, note = $note
WHERE consultation_id = $$consultation_id;

/*Remove a Consultation*/
SELECT *
FROM Clients cl
LEFT JOIN Consultations co
USING (client_id)
WHERE (fname = $fname
  AND lname = $lname)
  OR (consultation_id = $$consultation_id);

DELETE
FROM Consultations
WHERE (fname = $firstname
  AND lname = $lastname)
  OR (consultation_id = $$consultation_id);

/*Add/Remove Client Condition */
/*Get List for data validation in case there are multiple clients with the same first/last name*/
SELECT *
FROM Clients cl
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

/*Add Condition*/
INSERT INTO Clients_Conditions (client_id, condition_id)
VALUES ($$client_id, (SELECT condition_id FROM Conditions WHERE condition_name = $condition_name));

/*Remove Condition*/
DELETE
FROM Clients_Conditions
WHERE client_id = $$client_id
AND (SELECT condition_id FROM Condtions WHERE condition_name = $condition_name));

/*Add recommendation for Client*/
/*Check for duplicate name records*/
SELECT *
FROM Clients cl
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

/*Get recommendations based on Conditions and Supplement IF supplement flag*/
SELECT co.condition_name AS 'Condition Name', type AS 'Type', brand_name AS 'Brand'
FROM Conditions co
JOIN Conditions_Supplements cs
USING (condition_id)
JOIN
(
     SELECT s.supplement_id, s.type, s.brand_id
     FROM Supplements s
     LEFT JOIN
     (
         SELECT client_id, supplement_id
         FROM Clients_Supplements cl
         WHERE client_id = $client_id
     ) as cs
     ON (s.supplement_id = cs.supplement_id)
     WHERE client_id IS NULL
) css
ON (cs.supplement_id = css.supplement_id)
LEFT JOIN Brands b
ON (css.brand_id = b.brand_id)
WHERE (condition_id = $condition_id);

/*Get recommendations based on Conditions and Articles IF article flag*/
SELECT condition_name AS 'Condition Name', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'
FROM Conditions co
JOIN Conditions_Articles ca
USING (condition_id)
JOIN
(
     SELECT a.article_id, a.title, a.author, a.publication, a.website
     FROM Articles a
     LEFT JOIN
     (
         SELECT client_id, article_id
         FROM Clients_Articles al
         WHERE client_id = $client_id
     ) AS asx
     ON (a.article_id = asx.article_id)
     WHERE client_id IS NULL
) asz
ON (ca.article_id = asz.article_id)
WHERE (condition_id = $condition_id);

/*Add Recommendations based on Selections*/
INSERT INTO Clients_Articles (date_recommended, client_id, article_id)
VALUES $(CURDATE(), $client_id, $article_id); --Populate number of queries based on selection choice handled in JS

INSERT INTO Clients_Supplements (date_recommended, client_id, supplement_id)
VALUES $(CURDATE(), $client_id, $supplement_id); --Populate number of queries based on selection choice handled in JS

/*View Recommendations*/
/*Check for duplicate name records*/
SELECT *
FROM Clients cl
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

/*Table pull for article recommendations*/
SELECT fname AS 'First Name', lname AS 'Last Name', article_id as 'Article ID', date_recommended AS 'Date Recommended', title AS 'Title', author AS 'Author', publication AS 'Publication', website as 'Website'
FROM Clients c
JOIN Clients_Articles ca
USING (client_id)
JOIN Articles a
USING (article_id)
WHERE client_id = $client_id;

/*Table pull for Supplement Recommendations*/
SELECT fname AS 'First Name', lname AS 'Last Name', supplement_id as 'Supplement ID', date_recommended AS 'Date Recommended', type AS 'Type', brand_name AS 'Brand'
FROM Clients c
USING (client_id)
JOIN Supplements s
USING (supplement_id)
LEFT JOIN Brands b
USING (brand_id)
WHERE client_id = $client_id;

/*Article Database Queries*/
/*Add Article*/
INSERT INTO Articles (title, author, publication, date, website)
VALUES ($title, $author, $publication, $date, $website)

/*If Condition added*/
INSERT INTO Conditions_Articles (condition_id, article_id)
VALUES ($condition_id, (SELECT article_id FROM Articles WHERE title = $title, author = $author, publication = $publication, date = $date, website = $website));

/*If Supplement added*/
/*Check to see if SUpplement exists*/
SELECT supplement_id
FROM Supplements
WHERE type = $type;

INSERT INTO Supplements_Articles (supplement_id, article_id)
VALUES ($supplement_id, (SELECT article_id FROM Articles WHERE title = $title, author = $author, publication = $publication, date = $date, website = $website));

/*Search articles by Condition*/
SELECT article_id AS 'Article ID', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'
FROM Conditions c
JOIN Conditions_Articles ca
USING (condition_id)
JOIN Articles a
USING (article_id)
WHERE condition_id = $condition_id;

/*Search Articles by Supplement*/
SELECT article_id AS 'Article ID', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'
FROM Supplements s
JOIN Supplements_Articles sa
USING (supplement_id)
JOIN Articles a
USING (article_id)
WHERE supplement_id = $supplement_id;

/*Update Articles*/
/*Filter Articles to Update by Title, attempting to implement pattern searching*/
Select title as 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website', publish_date AS 'Publish Date'
FROM Articles
WHERE (title = $title) OR (title LIKE '%$firstTitleWord% %$lastTitleWord%');  --Use LIKE and pattern matching with JS variables to get similiar names

UPDATE Articles
SET (title = $title, publish_date = $publish_date, publication = $publication, author = $author, website = $website)
WHERE article_id = $article_id;

/*If Conditions flag is set*/
/*Add Condition*/
INSERT INTO Conditions_Articles (condition_id, article_id)
VALUES ($condition_id, (SELECT article_id FROM Articles WHERE title = $title, author = $author, publication = $publication, date = $date, website = $website));

/*Remvoe Condition*/
DELETE
FROM Articles_Conditions ac
WHERE article_id = $article_id AND condition_id = $condition_id;

/*If Supplement Flag is SET*/
/*Check to see if SUpplement exists*/
SELECT supplement_id
FROM Supplements
WHERE type = $type;

INSERT INTO Supplements_Articles (supplement_id, article_id)
VALUES ($supplement_id, (SELECT article_id FROM Articles WHERE title = $title, author = $author, publication = $publication, date = $date, website = $website));

/*Remove Supplement*/
/*Check to see if SUpplement exists*/
SELECT supplement_id
FROM Supplements
WHERE type = $type;

DELETE
FROM Supplements_Articles sa
WHERE supplement_id = $supplement_id AND article_id = $article_id;

/*Remove an Article from the Library*/
/*Check to see if Article exists, handle multiple data*/
SELECT article_id
FROM Articles
WHERE (title = $title) OR (title LIKE '%$firstTitleWord% %$lastTitleWord%');

DELETE
FROM Articles a
WHERE article_id = $article_id;

/*SUpplement Data Queries*/
/*Add Article*/
INSERT INTO Supplements (type, brand_id)
VALUES ($type, $$brand_id)

/*If Condition added*/
INSERT INTO Conditions_Supplements (condition_id, supplement_id)
VALUES ($condition_id, $supplement_id);

/*Update Supplement*/
/*Filter Supplements by type and validate specific supplement*/
SELECT supplement_id AS 'Supplement ID', type AS 'Type', brand_name as 'Brand_name'
FROM Supplements
LEFT JOIN Brands
USING (brand_id)
WHERE type = $type;

UPDATE Supplements
SET (type = $type, brand_id = $brand_id);

/*If adding a new condtion*/
INSERT INTO Conditions_Supplements (condition_id, supplement_id)
VALUES ($condition_id, $supplement_id);

/*If Removing Condition*/
DELETE
FROM Conditions_Supplements
WHERE condition_id = $condition_id AND supplement_id = $supplement_id;

/*Search Supplements by Condtion*/
SELECT supplement_id AS 'Supplement ID', type AS 'Type', brand_name AS 'Brand Name'
FROM Supplements s
JOIN Conditions_Supplements cs
USING (supplement_id)
JOIN Conditions c
USING (condition_id)
LEFT JOIN Brands b
USING (brand_id)
WHERE condition_id = $condition_id;

/*Search supplements by Brands*/
SELECT supplement_id AS 'Supplement ID', type AS 'Type', brand_name AS 'Brand Name'
FROM Supplements
JOIN Brands
USING (brand_id)
WHERE brand_id = $brand_id;

/*Manage Brands*/
/*Add a Brand*/
INSERT INTO Brands (brand_name)
VALUES ($brand_name);

/*Remove a Brand*/
DELETE
FROM Brands
WHERE brand_id = $brand_id;

/*Condition Data Queries*/
/*Add Condition for Treatment*/
INSERT INTO Conditions (condition_name)
VALUES ($condition_name);

/*View ALl Conditions*/
SELECT *
FROM Conditions;

/*Update a Condition*/
UPDATE Conditions
SET (condition_name = $condition_name)
WHERE condition_id = $condition_id;

/*Remove a Condition*/
DELETE
FROM Conditions
WHERE condition_id = $condition_id;

/*Other Data Queries*/
/*Dynamically Get List of Conditions Excluding Ones with supp treatment relationship*/
SELECT condition_id, condition_name
FROM Conditions
LEFT JOIN Conditions_Supplements
USING (condition_id)
LEFT JOIN Supplements
USING (supplement_id)
WHERE supplement_id != $supplement_id OR supplement_id IS NULL;

/*Dynamically Get List of Conditions associated with supp treatment relationship*/
SELECT condition_id, condition_name
FROM Conditions
JOIN Conditions_Supplements
USING (condition_id)
JOIN Supplements
USING (supplement_id)
WHERE supplement_id = $supplement_id;

/*Dynamically get list of all COnditions*/
SELECT condition_id, condition_name
FROM Conditions;

/*Dynamically Get List of Conditions Excluding Ones with article relationship*/
SELECT condition_id, condition_name
FROM Conditions
LEFT JOIN Conditions_Articles
USING (condition_id)
LEFT JOIN Articles
USING (article_id)
WHERE article_id != $article_id OR article_id IS NULL;
