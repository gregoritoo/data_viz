import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt

df=pd.read_csv('vehicules-2018.csv',sep=',',encoding='latin-1')
df2=pd.read_csv('usagers-2018.csv',sep=',',encoding='latin-1')
df2["count"]=[1]*len(df2)
print(df)
print(df2)
df = df.merge(df2, on='Num_Acc', how='inner', suffixes=('_1', '_2'))
print(df)
df=df.groupby(["catv","grav","secu"]).sum()
print(df)
df.to_csv("join.csv")


