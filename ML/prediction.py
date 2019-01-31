import pandas as pd
import numpy as np
import csv
from collections import defaultdict
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.externals import joblib
from sklearn import preprocessing,neighbors,svm
from sklearn.tree import DecisionTreeClassifier



def get_list(cell):
    new_list = []
    match = cell.split('^')
    for element in match:
        try:
            new_list.append(element.replace('\xa0', ' ').split('_')[1])
        except(IndexError):
            new_list.append(element.replace('\xa0', ' '))
    return new_list

with open("dataset.csv") as csvfile:
    reader = csv.reader(csvfile)
    wt_dis_dict = {}
    sym_dis_dict = defaultdict(list)
    weight = 0
    disease_list = []
    for row in reader:
        if not row[0] == "" and not row[0] == "\xc2\xa0" and not row[0] == "\\xc2\\xa0":
            disease_list = get_list(row[0])
            weight = row[1]
        if not row[2] == "" and not row[2] == "\xc2\xa0" and not row[2] == "\\xc2\\xa0":
            symptom_list = get_list(row[2])

            for disease in disease_list:
                for symptom in symptom_list:
                    sym_dis_dict[disease].append(symptom)
                wt_dis_dict[disease] = weight
    #print(symdis_dict)
    #print(wt_dis_dict)

with open("disease_clean.csv", 'w') as csvfile:
    writer = csv.writer(csvfile)
    for key, values in sym_dis_dict.items():
        for val in values:
            writer.writerow([key, val, wt_dis_dict[key]])

columns = ['Disease','Symptom','Weight']
data = pd.read_csv("disease_clean.csv", names=columns, encoding ="ISO-8859-1")
data.to_csv("disease_clean1.csv", index=False)
df = pd.DataFrame(data)
#print(df)
#print(df.Symptom)
df_1 = pd.get_dummies(df.Symptom)
#print(df_1[:10])

df_2 = df['Disease']
#print(df_2[:10])

df_f = pd.concat([df_2, df_1], axis = 1)
#print(df_f[:10])

df_ff = df_f.drop_duplicates(keep = 'first')
#print(df_ff)

df_ff = df_ff.groupby('Disease').sum()
df_ff = df_ff.reset_index()
#print(df_ff)
#print(df_ff.head())

df_ff.to_csv("Final_DataFrame.csv", encoding = 'utf-8', index = False)

col = df_ff.columns
col = col[1:]
#print(col)
x = df_ff[col]
#print(x)
y = df_ff['Disease']
#print(list(y))

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size =0.2)



clf = RandomForestClassifier()
#clf= DecisionTreeClassifier()


trained_model = clf.fit(x, y)
joblib.dump(trained_model, 'RandomForestF.pkl')
trained_model.score(x,y)
accuracy=clf.score(x_train,y_train)
print(accuracy)
#print(accuracy_score(y, trained_model.predict(x)))

'''
predictions = trained_model.predict(x_train)
for i in range(0,10):
    print(list(y_train)[i], "Predicted: ", predictions[i])

print("Train Accuracy:")
print(accuracy_score(y_train, trained_model.predict(x_train)))
print("Test Accuracy:")
print(accuracy_score(y_test, trained_model.predict(x_test)))
'''
