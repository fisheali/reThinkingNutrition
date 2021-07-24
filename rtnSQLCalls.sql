/*
Names: Calvin Todd and Alice Fischer
Class: CS 340
Assignment: Assignment 4 - Data Manipulation Queries
*/

/*
Notes:
All user passed variable will use a $ before the variable.  $example.
There will be some hidden variables passed as well, will annotate with $$. $$example.
Will provide comments in code for clarity
*/

/*Client Data Manipulation Queries*/

/*Add New Client*/
INSERT INTO Clients (fname, lname, phone, email, address, city)
VALUES ($add_client_fname, $add_client_lname, $add_client_phone, $add_client_email, $add_client_street, $add_client_city);

/*Retrieve Client's Record*/
SELECT clinet_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City'
FROM Clients cl
WHERE ($firstname = fname
  AND $lastname = lname)
  OR ($$clinet_id = client_id);

/*The OR Client_id will be used if the query returns multiple records the first query in
case two people with the same name are in the DB.  A lot of this will be handled
in the javascript, otherwise an empty value will be passed in $$client_id.
This is the same in all methods in this section*/

/*IF Consultations flag*/
SELECT fname AS 'First Name', lname AS 'Last Name', consultation_id AS 'Consultation ID', date AS 'Date', time AS 'Time', completed AS 'Consultation Completed', paid AS 'Paid?', note AS 'Notes'
FROM Clients cl
LEFT JOIN Consultations co
USING (client_id)
WHERE (fname = $fname
  AND lname = $lname)
  OR (client_id = $$client_id);

/*IF Articles flag*/
SELECT article_id as 'Article ID', date_recommended AS 'Date Reccomended', title AS 'Title', publish_date AS 'Publish Date', publication AS 'Publication', author AS 'Author', website AS 'Website'
FROM Clients cl
LEFT JOIN Clients_Articles ca
USING (client_id)
LEFT JOIN Articles a
USING (article_id)
WHERE (fname = $firstname
  AND lname = $lastname)
  OR (client_id = $$client_id);

/*If Supplements flag*/
SELECT supplement_id AS 'Supplement ID', date_recommended AS Date 'Reccomended', type AS 'Type', brand_id AS 'Brand'
FROM Clients cl
LEFT JOIN Clients_Supplements cs
USING (client_id)
LEFT JOIN Supplements s
USING (supplement_id)
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
  WHERE paid = 0
    AND DATE_SUB(CURDATE(), INTERVAL $dayRange DAY) > DATEDIFF(CURDATE(), date);

  /*Get Client Invoices*/
  SELECT fname AS 'First Name', lname AS 'Last Name', date AS 'Consultation Date', paid AS "Paid?", phone AS 'Phone Number', email AS 'Email Address'
  FROM Consultations co
  LEFT JOIN Clients cl
  USING (client_id)
  WHERE (fname = $firstname
    AND lname = $lastname)
    OR (client_id = $$client_id);

  /*Remove a Client*/
  /*Get List for processing in case there are multiple clients witht he same last name*/
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
