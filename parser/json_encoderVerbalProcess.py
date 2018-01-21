# coding=utf8
# -*- coding: utf8 -*-
# vim: set fileencoding=utf8 :
import json
import sys
import re


def readParagraph(file):
    paragraph = ""
    line = file.readline()
    lastpos = None
    separator_chars = '^[_]+\n$'
    while not re.match(separator_chars, line):
        paragraph += line
        line = file.readline()
        if not line:
            break
        lastpos = file.tell()
    if lastpos != None:
        file.seek(lastpos)
    return paragraph


# Name of the file to read 
fileName = sys.argv[1] 

# Dictionary
jsonFile = {}

file = open(fileName + ".txt", "r")

currentFile = {"D":dict()}
currentFileNb = None

line = file.readline()

currentFileType = None

subjects = ["RESOLUTION", "RAW"]

separator_chars = '^[_]+$'

while line : 
    if re.match(separator_chars, line):
        currentFileNb = 0
        raw = readParagraph(file)
        for eazy in raw.split("\n"):
            id_ = eazy
            if len(id_) == 10 and id_[0].isdigit() and id_[1].isdigit()and id_[2].isdigit()and id_[3].isdigit()and id_[4].isdigit()and id_[5].isdigit()and id_[6].isdigit()and id_[7].isdigit()and id_[8].isdigit()and id_[9].isdigit():
                currentFileNb = id_
            if len(id_) == 16 and id_[6].isdigit() and id_[7].isdigit()and id_[8].isdigit()and id_[9].isdigit()and id_[10].isdigit()and id_[11].isdigit()and id_[12].isdigit()and id_[13].isdigit()and id_[14].isdigit()and id_[15].isdigit():
                currentFileNb = id_[6:15]
        if currentFileNb != 0:
            print currentFileNb
            resolution = ""
            tempList = raw.split("Et résolu :")
            if len(tempList) > 1:
                resolution = "Il a été résolu :\n" + tempList[1]
            currentFile["D"]["RAW"] = raw
            currentFile["D"]["RESOLUTION"] = resolution
            jsonFile[currentFileNb] = currentFile
        currentFile = {"D":dict()}

    line = file.readline()


jsonArray = []
for key, value in jsonFile.iteritems():
    value["noDossier"] = key
    jsonArray.append(value)


# Dump the json file
with open(fileName + ".json", "w") as output:
    json.dump(jsonArray, output, ensure_ascii=False)