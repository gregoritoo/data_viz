import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt

df=pd.read_csv('caracteristiques-2018.csv',sep=',',encoding='latin-1')
df["count"]=[1]*len(df)

df=df.groupby(['atm']).sum()
print(df)
for i in range(len(df)) :
	if df["atm"][i]=="1" :
		df[i]["atm"] = "Normale"
	elif df[i]["atm"]=="2" :
		df[i]["atm"] = "Pluie légère"
	elif df[i]["atm"]=="3" :
		df[i]["atm"] = "Pluie forte"
	elif df[i]["atm"]=="4" :
		df[i]["atm"] = "Neige-grêle"
	elif df[i]["atm"]=="5" :
		df[i]["atm"] = "Brouillard-fumée"
	elif df[i]["atm"]=="6" :
		df[i]["atm"] = "Vent fort/tempête"
	elif df[i]["atm"]=="7" :
		df[i]["atm"] = "Temps emblouissant"
	elif df[i]["atm"]=="8" :
		df[i]["atm"] = "Temps couvert"
	elif df[i]["atm"]=="9" :
		df[i]["atm"] = "Autres"
print(df)
df.to_csv("data_atm.csv")


