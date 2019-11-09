#I used geeksforgeeks.org and realpython.com as primary resources.

import os
import csv

bank_data = os.path.join("budget_data.csv")

date=[]
pL=()
max = 0
min = 1000000000
totalsum = 0
change = 0
rowCount = 0
i = 0
previous = 0
current = 0
running = 0

with open(bank_data, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    
    next(csvreader, None)
    
    for row in csvreader:
    
        if int(row[1]) >= max:
            max = int(row[1])
            maxname = str(row[0])
    
        if int(row[1])   <= min:
            min = int(row[1])
            minname = str(row[0])
    
        totalsum = int(totalsum) + int(row[1])
        rowCount = rowCount + 1
        date.append(rowCount)
        
        while i <= rowCount-2:
            previous = current
            current = int(row[1])
            running = running + (current - previous)
            i = i + 1
            
        change = running / rowCount

print("Total Months: " + str(len(date)))
print("Total Revenue: $" + str(totalsum))
print("Average Revenue Change: $" + str(round(change,2)))
print("Greatest Increase in Revenue: $" + str(max) + " on " + maxname)
print("Greatest Decreased in Revenue: $" + str(min) + " on " + minname)

with open('financial_results.txt', 'w') as text:
    text.write("Total Months: " + str(len(date))+"\n")
    text.write("Total Revenue: $" + str(totalsum)+"\n")
    text.write("Average Revenue Change: $" + str(round(change,2))+"\n")
    text.write("Greatest Increase in Revenue: $" + str(max) + " on " + maxname +"\n")
    text.write("Greatest Decreased in Revenue: $" + str(min) + " on " + minname +"\n")
		
#my Change, Greatest Increase/Decrease is different from the ReadMe file but I think that is because I changed the location of the file
#and when moving over the spreadsheet only so much data ported over due to size. Additionally, since I moved the file I could  
#drop the os.path.join of line 6, since I didn't have to call into a different folder.		

