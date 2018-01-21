# coding=utf8
# -*- coding: utf8 -*-
# vim: set fileencoding=utf8 :
import json
import sys


def readParagraph(file):
    paragraph = ""
    line = file.readline()
    lastpos = None
    while not (line == '\n' or line.isupper()):
        paragraph += line
        line = file.readline()
        lastpos = file.tell()
    if lastpos != None:
        file.seek(lastpos)
    return paragraph


# Name of the file to read 
fileName = sys.argv[1] 

# Dictionary
jsonFile = {}

file = open(fileName + ".txt", "r")

currentFile = {"SD":dict(), "SA":dict(), "RA":dict(), "R":dict()}
currentFileNb = None

line = file.readline()

currentFileType = None

subjects = ["CONTEXTE", "DESCRIPTION", "JUSTIFICATION"]

while line : 

    if "Système de gestion" in line:
        file.readline()
        line = file.readline()
        if "SOMMAIRE DÉCISIONNEL" in line:
            currentFileType = "SD"
        elif "SOMMAIRE ADDENDA" in line:
            currentFileType = "SA"
        elif "RECOMMANDATION ADDENDA" in line:
            currentFileType = "RA"
        elif "RECOMMANDATION" in line :
            currentFileType = "R"

    elif "Dossier #" in line :
        fileNb = ''.join(char for char in line if char.isdigit())
        # If it's the first file there is nothing to save.
        if currentFileNb is None:
            currentFileNb = fileNb
            continue
        # If we are moving to the next file, save last one.
        if fileNb != currentFileNb and fileNb not in jsonFile :
            jsonFile[currentFileNb] = currentFile
            currentFileNb = fileNb
            currentFile = {"SD":dict(), "SA":dict(), "RA":dict(), "R":dict()}

    # Add the recommandation.
    elif "Objet" in line and (currentFileType == "R" or currentFileType == "RA"):#("Il est recommand" in line or "IL EST RECOMMAND" in line) and (currentFileType == "R" or currentFileType == "RA") :
        file.readline()
        readParagraph(file)
        paragraph = readParagraph(file)
        while paragraph == '\n':
            paragraph = readParagraph(file)
        currentFile[currentFileType]["RECOMMANDATION"] = paragraph

    # For each subjects
    for i in range(len(subjects)):
        if subjects[i] in line:
            file.readline()
            currentFile[currentFileType][subjects[i]] = readParagraph(file)

    line = file.readline()


jsonArray = []
for key, value in jsonFile.iteritems():
    value["noDossier"] = key
    jsonArray.append(value)


# Dump the json file
with open(fileName + ".json", "w") as output:
    json.dump(jsonArray, output, ensure_ascii=False)