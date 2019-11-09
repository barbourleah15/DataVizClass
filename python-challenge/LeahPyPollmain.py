import os
import csv

Data_Results = os.path.join("election_data.csv")

Candidate = []
VoterID = []
rowCount = 0
Winner = 0
WinnerName = ""
i = 0

with open(Data_Results, newline="") as csvfile:
	csvreader = csv.reader(csvfile, delimiter=",")
	
	next(csvreader, None)
		
	for row in csvreader:
		rowCount = rowCount + 1
		if row[2] not in Candidate:
			Candidate.append(row[2])
			VoterID.append(0)
		else:
			VoterID[Candidate.index(row[2])] = VoterID[Candidate.index(row[2])] + 1
	
#I had no idea how to find the winner (line 28) and used geeksforgeeks.org and realpython.com as primary resources.
	Winner = max(range(len(VoterID)), key = lambda x: VoterID[x])
	WinnerName = Candidate[int(Winner)]
	
	print("Total Votes: " + str(rowCount))
	while i <= (len(Candidate) - 1):
		print(Candidate[i] + ": " + str(round((VoterID[i]/rowCount * 100),2)) + "% (" + str(VoterID[i]) + ")")
		i=i+1
		print("Winner: " + str(WinnerName))
		break

with open('election_results.txt', 'w') as text:
	text.write("Total Votes: " + str(rowCount)+"\n")
	while i <= (len(Candidate) - 1):
		print(Candidate[i] + ": " + str(round((VoterID[i]/rowCount * 100),2)) + "% (" + str(VoterID[i]) + ")\n")
		i=i+1
		text.write("The winner is: " + str(WinnerName) + "\n")
#my Total Votes is different from the ReadMe file but I think that is because I changed the location of the file
#and when moving over the spreadsheet only so much data ported over due to size.		

