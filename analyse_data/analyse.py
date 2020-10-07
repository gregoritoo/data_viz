import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt

df=pd.read_csv('caracteristiques-2018.csv',sep=',',encoding='latin-1')

df["dep"]=[int(str(df.iloc[i]["dep"])[:-1]) for i in range(len(df))]
df["count"]=[1]*len(df)
df=df.groupby("dep").sum()
print(df)
df.to_csv("departement.csv")


